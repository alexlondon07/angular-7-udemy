import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public title: string;
  public user: User;
  public identity;
  public token;

  constructor(private _userservice: UserService) { 
    this.title = 'Update user';
    this.identity = this._userservice.getIdentity();
    this.token = this._userservice.getToken();
    this.user = this.identity;
  }


  ngOnInit() {
    console.log('UserEditComponent Loaded !!');
  }

}
