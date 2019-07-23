import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable()
export class AnimalService {

    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addAnimal(token, animal){
        let params = JSON.stringify(animal);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url+'animal', params, { headers: headers})
        .map(res => res);
    }

    getAnimals(){
        return this._http.get(this.url+'animals').map(res => res);
    }

    getAnimal(id){
        return this._http.get(this.url+'animal/'+id).map(res => res);
    }

    editAnimal(token, id, animal){
        let params = JSON.stringify(animal);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url+'animal/'+id, params, { headers })
                .map(res => res);
    }

}