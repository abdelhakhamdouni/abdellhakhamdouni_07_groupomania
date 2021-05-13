import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import User from '../models/User';
import * as UserAction from '../@store/actions/user.actions'
import { Store } from '@ngrx/store';
import { AppState } from '../AppState';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  url: string = "http://localhost:8000/api/users/"

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getUser():Observable<User>{
    return of(JSON.parse(sessionStorage.getItem('user')))
  }

  getUsers():void{
    this.http.get(this.url).subscribe(users =>{
      this.store.dispatch(new UserAction.LoadUsers(users as User[]))
    })
  }

}
