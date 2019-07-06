import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService }  from './services/user.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Angular Course 4 - NGZOO';
  emailContact: string;
  public identity;

  constructor(
    private _userServive: UserService, 
    private _route : ActivatedRoute,
    private _router: Router){  

    }

  ngOnInit(){
    this.identity = this._userServive.getIdentity();
    this.getEmail();
  }

  ngDoCheck(){
    this.identity = this._userServive.getIdentity();
    this.getEmail();
  }

  getEmail(){
    this.emailContact = localStorage.getItem('emailContact');
  }

  deleteEmail(){
    localStorage.removeItem('emailContact');
    localStorage.clear();
    this.emailContact = null;
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}
