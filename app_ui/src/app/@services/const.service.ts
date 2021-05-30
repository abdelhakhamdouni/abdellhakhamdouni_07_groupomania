import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstService {

  constructor() { }

  getUrl(str: string){
    return "https://ormes-web-service.fr/gpapp/api/"+str
  }

}
