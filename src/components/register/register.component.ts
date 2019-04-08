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

  onSubmit(){

    this._userservice.register(this.user).subscribe((response)=>{
      try {
        console.log("response", response);
        if(response.user._id){
          this.user = response.user;
          this.status = 'The register was success';
        }else{
          this.status = 'Error in the user register'
        }
      } catch (error) {
        console.log('Error to register user:  '+error);
      }
    });
  }
}
