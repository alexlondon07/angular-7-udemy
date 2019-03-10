import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public title: string;
  
  constructor(private _route : ActivatedRoute, private _router: Router) { 
    this.title = 'Register';
  }

  ngOnInit() {
    console.log('Register Component Loaded !!');
  }

}
