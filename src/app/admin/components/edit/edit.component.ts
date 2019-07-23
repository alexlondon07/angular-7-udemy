import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service.service";
import { AnimalService } from "src/app/services/animal.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Animal } from "src/app/models/animal";
import { GLOBAL } from "src/app/services/global";

@Component({
  selector: "admin-edit",
  templateUrl: "../add/add.component.html",
  providers: [UserService, AnimalService]
})
export class EditComponent implements OnInit {
  public title = "Edit";
  public animal: Animal;
  public identity;
  public token;
  public url: string;
  public status;
  public message;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userServide: UserService,
    private _animalServide: AnimalService
  ) {
    this.animal = new Animal('', '', '', '2019', '', '');
    this.identity = this._userServide.getIdentity();
    this.title = this.title;
    this.token = this._userServide.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("EditComponent Loaded !!");
    this.getAnimal();
  }

  onSubmit() {
    var id = this.animal._id;
    this._animalServide.editAnimal(this.token, id, this.animal)
      .subscribe(response => {
        this.status = "success";
        try {
          if (response["animal"]._id) {
            this.message = "The animal update was success";
            this.animal = response["animal"];

            this._router.navigate(["/animal/"+response["animal"]._id]);
          } else {
            this.message = "Error in the animal update";
            this.status = "error";
          }
        } catch (error) {
          console.log(error);
          this.status = "error";
          this.message = "Error to update animal:  " + error;
        }
      });
  }

  getAnimal() {
    this._route.params.forEach((params: Params) => {
      let id = params["id"];
      this._animalServide.getAnimal(id).subscribe(
        response => {
          if (!response["animal"]) {
            this._router.navigate(["/animal"]);
          } else {
            this.animal = response["animal"];
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }
}
