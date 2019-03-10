import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public title: string;
  constructor(private _route : ActivatedRoute, private _router: Router) { 
    this.title = 'Login'
  }

  ngOnInit() {
    console.log('Login Component Loaded !!');
  }

}
