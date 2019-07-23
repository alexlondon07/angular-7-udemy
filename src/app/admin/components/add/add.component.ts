import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service.service';
import { AnimalService } from 'src/app/services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'admin-add',
  templateUrl: './add.component.html',
  providers: [ UserService, AnimalService ]
})
export class AddComponent implements OnInit {
  public title = 'Add'; 
  public animal:Animal;
  public identity;
  public token;
  public url:string; 
  public status;
  public message;
  
  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _userServide: UserService,
    private _animalServide: AnimalService
  ) {
    this.animal = new Animal('', '', '', '2019', '', '');
    this.identity = this._userServide.getIdentity();
    this.title = this.title;
    this.token = this._userServide.getToken();
    this.url = GLOBAL.url
  }

  ngOnInit() {
    console.log('AddComponent Loaded !!');
  }

  onSubmit(){
    this._animalServide.addAnimal(this.token, this.animal).subscribe((response)=>{
      this.status = 'success';
      try {
        if( response["animal"]._id ){
          this.message = 'The animal register was success';
          this.animal = response["animal"];

          this._router.navigate(['/admin-panel/list']);
        }else{
          this.message = 'Error in the animal register'
          this.status = 'error';
        }
      } catch (error) {
        console.log(error);
        this.status = 'error';
        this.message = 'Error to register animal:  '+error;
      }
    });
  }

}
