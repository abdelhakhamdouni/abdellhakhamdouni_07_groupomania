import { ConstService } from './const.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;

  constructor(private http: HttpClient, private constService: ConstService) {
    this.url = constService.getUrl('auth')
   }


  getLoggedUser():Observable<boolean>{
    return new Observable(observer => {
      observer.next(sessionStorage.getItem('token') != null)
      
    })
  }

  public login(email:string, password:string): Observable<any> {
    return this.http.post(`${this.url}/login`, {
      email, 
      password
    })
  }

  public register(formdata):Observable<any>{
    return this.http.post(`${this.url}/signup`, formdata)
  }

  public fpassword(email):Observable<any>{
    return this.http.put(this.url+'/update-password', email)
  }

  public deleteUser(id, pass):Observable<any>{
    return this.http.delete(this.url+'/'+id, pass)
  }

}
