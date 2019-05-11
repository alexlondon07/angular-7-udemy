import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public message: string;
  public status: string;

  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _userservice: UserService
    ) { 
    this.title = 'Register';
    this.user = new User('','','','','','ROLE_USER', '');
  }

  ngOnInit() {
    console.log('Register Component Loaded !!');
  }

  cleanUser(){
    this.user = new User('','','','','','ROLE_USER', '');
  }

  onSubmit(){
    this._userservice.register(this.user).subscribe((response)=>{
      this.status = 'success';
      try {
        if( response["user"]._id ){
          this.message = 'The register was success';
          this.user = new User('','','','','','ROLE_USER', '');
        }else{
          this.message = 'Error in the user register'
          this.status = 'error';
        }
      } catch (error) {
        this.status = 'error';
        console.log('Error to register user:  '+error);
        this.message = 'Error to register user:  '+error;
      }
    });
  }
}
