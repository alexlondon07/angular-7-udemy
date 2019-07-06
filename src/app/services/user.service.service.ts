import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService {
  public url: string;
  public login: string;
  public identity;
  public token;
  
  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
    this.login = GLOBAL.login;
  }

  /**
   * Metodo para registrar usuario
   * @param user_to_register 
   */
  register(user_to_register){
      let params = JSON.stringify(user_to_register);
      let headers = new HttpHeaders({'Content-Type': 'application/json'});

      return this._http.post(this.url+'register-user', params, { headers: headers } ).
      map(res => res);
  }

  /**
   * Metodo para realizar el login
   */
  signup(user_to_login, gettoken = null){
      if ( gettoken !=null ){
        user_to_login.gettoken = gettoken;
      }
      let params = JSON.stringify(user_to_login);
      let headers = new HttpHeaders({'Content-Type': 'application/json'});
      
      return this._http.post(this.url + this.login, params, { headers: headers } ).
      map(res => res);
  }

  getIdentity(){
      let identity = JSON.parse( localStorage.getItem('identity') );
      if( identity != "undefined"){
        this.identity = identity;
      }else{
        this.identity = null;
      }
      return this.identity;
  }

  getToken(){
      let token = localStorage.getItem('token');
      if( token != "undefined"){
        this.token = token;
      }else{
        this.token = null;
      }
      return this.token;
  }

  updateUser(usert_to_update){
      let params = JSON.stringify(usert_to_update);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      });

      return this._http.put(this.url+'update-user/' + usert_to_update._id, params, { headers: headers } )
        .map(res => res);
  }
}




