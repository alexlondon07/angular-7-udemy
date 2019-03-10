import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public title: string;
  public user: User;

  constructor(private _route : ActivatedRoute, private _router: Router) { 
    this.title = 'Register';
    this.user = new User('','','','','','ROLE_USER', '');
  }

  ngOnInit() {
    console.log('Register Component Loaded !!');
  }

  onSubmit(){
    console.log(this.user);
  }

}
