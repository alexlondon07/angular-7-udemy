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
  
  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  /**
   * Metodo para registrar usuario
   * @param user_to_register 
   */
  register(user_to_register){
    let params = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post<any>(this.url+'register-user', params, { headers: headers } ).map(res => res);
  }
}




