import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [ AnimalService ]
})
export class ListComponent implements OnInit {
  public title: string; 
  public items = new Array(15);
  public animals: Animal[];
  
  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _animalServide: AnimalService
  ) {
    this.title = 'Admin List';
  }

  ngOnInit() {
    this._animalServide.getAnimals().subscribe(
      response => {
        if(response['animals']){
          this.animals = response['animals'];
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
