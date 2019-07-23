import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'animal-detail',
  templateUrl: './animal-detail.component.html',
  providers: [ AnimalService ]
})
export class AnimalDetail implements OnInit {
  
  public title: string; 
  public url: string; 
  public animal: Animal;

  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _animalServide: AnimalService
  ) {
    this.url = GLOBAL.url;
    this.title = 'Animal Detail';
  }

  ngOnInit() {
    console.log('ListComponent loaded');
    this.getAnimal();
  }

  getAnimal(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._animalServide.getAnimal(id).subscribe(
        response =>{
          if(!response['animal']){
            this._router.navigate(['/']);
          }else{
            this.animal = response['animal'];
          }
        },
        error =>{
          console.log(<any>error);
        }
      )
    })
  }

}
