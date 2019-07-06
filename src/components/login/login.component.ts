import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title: string;
  public user: User;
  public identity;
  public token;
  public message: string;
  public status: string;

  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _userservice: UserService) { 

    this.title = 'Identificate';
    this.user = new User('','','','','', 'ROLE_USER', '');
  }

  ngOnInit() {
    console.log('Login Component Loaded !!');
    console.log( this._userservice.getIdentity() );
    console.log( this._userservice.getToken() );
  }
  
  onSubmit(){
    //console.log(this.user);
    try {
        //User Login and get  User Object
        this._userservice.signup(this.user).subscribe(response => {
            this.identity = response["user"];

            if( !this.identity || !this.identity._id){
              alert('The user has not been logged in');
            }else{
              this.identity.password = '';

              localStorage.setItem('identity', JSON.stringify( this.identity ));

                //Get Token
                this._userservice.signup(this.user, 'true').subscribe(
                  response => {
                    this.token = response["token"];
                    if( this.token.length <=0 ){
                      alert('Error generating the token');
                    }else{
                      localStorage.setItem('token', this.token);
                      this.status = 'success';

                      this._router.navigate(['/']);
                    }
                  },
                  error => {
                    console.log('Error get token:  ',<any>error.message);
                    this.status = 'error';
                  }
                )
            }
          },
          error => {
            var errorMessage  = <any>error;
            if ( errorMessage !=null){
              this.status = 'error';
              console.log('Error in catch Login:  ', errorMessage.error.message);
            }
          }
        )
    } catch (error) {
      console.log('Error in catch Login:  ', <any>error.message);
      this.status = 'error';
    }
  }
}
