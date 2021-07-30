import { AppState } from 'src/app/AppState';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as MessageActions from '../@store/actions/message.actions'
import Message from '../models/Message'
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url: string = "http://localhost:8000/api/messages/"

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  sendMessage(mes_obj):void{
    this.http.post(this.url, mes_obj).subscribe(res=> {
      this.getMessage()
    })
    // let socket = io("http://localhost:8000", { transports : ['websocket','polling', 'flashsocket'] }).connect()
    // socket.emit('message', {name: "abdelhak"})
  }

  getMessage(){
    this.http.get(this.url).subscribe((messages) => this.store.dispatch(new MessageActions.LoadMessages(messages as Message[])))
  }

}
