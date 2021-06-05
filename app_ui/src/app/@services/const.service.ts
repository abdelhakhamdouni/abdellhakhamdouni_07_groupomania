import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstService {

  constructor() { }

  getUrl(str: string){
    return "http://localhost:8000/api/"+str
  }

}
