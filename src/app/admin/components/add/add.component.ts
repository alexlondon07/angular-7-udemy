import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service.service';
import { AnimalService } from 'src/app/services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';

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
  
  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _userservice: UserService,
    private _animalServide: AnimalService
  ) {
    this.title = this.title;
    this.animal = new Animal('', '', '2019', '', '');
  }

  ngOnInit() {
    console.log('AddComponent Loaded !!');
  }

}
