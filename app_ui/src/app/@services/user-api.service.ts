import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import User from '../models/User';
import * as UserAction from '../@store/actions/user.actions'
import * as OneUserAction from '../@store/actions/oneUser.actions'
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
  getUserFromApi(id){
    this.http.get(this.url+id).subscribe(user =>{
      this.store.dispatch(new OneUserAction.LoadOneUser(user as User))
    })
  }

  getOneUserFromApi(id):Observable<any>{
    return this.http.get(this.url+id)
  }

  updateUSerFullName(id, obj):void{
    this.http.put(this.url + 'edit/fullName/'+id, obj).subscribe((res) =>{
      this.getUserFromApi(id)
      this.getUsers()
    })
  }

  updateAvatar(id, formData):void{
    this.http.put(this.url + 'edit/avatar/'+id, formData).subscribe(res =>{
      this.http.get(this.url+id).subscribe(user =>{
        sessionStorage.setItem('user', JSON.stringify(user))
        this.getUsers()
      })
      this.getUserFromApi(id)
    })
  }

}
