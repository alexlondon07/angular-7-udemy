import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {

  public title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public message: string;

  constructor(private _userservice: UserService) { 
    this.title = 'Update user';
    this.identity = this._userservice.getIdentity();
    this.token = this._userservice.getToken();
    this.user = this.identity;
  }

  ngOnInit() {
    console.log('UserEditComponent Load');
  }

  onSubmit(){
    this._userservice.updateUser(this.user).subscribe((response)=>{
      this.status = 'success';
      try {
        if( !response["user"] ){
          this.status = 'error';
          this.message = 'Error to update user';
        }else{
          localStorage.setItem('identity', JSON.stringify(this.user));

          //Upload User Image
        }
      } catch (error) {
        this.status = 'error';
        this.message = 'Error to update user:  '+error;
      }
    });
  }

}
