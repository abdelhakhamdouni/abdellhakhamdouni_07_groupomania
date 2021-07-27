import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import User from 'src/app/models/User';
import { UserApiService } from './../../../@services/user-api.service';
import { Component, OnInit} from '@angular/core';
import { MessageService } from 'src/app/@services/message.service';
import { AppState } from 'src/app/AppState';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor(private userService: UserApiService, private mservice: MessageService, private store: Store<AppState>) { }

  user: User
  modal: HTMLElement = document.querySelector('.modal')
  message = new FormControl('')
  messages
  usersConnected

  ngOnInit(): void {
    this.mservice.getMessage()
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
    this.store.select('message').subscribe(messages => {

      this.messages = messages 
    })
    this.modal.classList.remove('show')
    let socket = io("http://localhost:8000", { transports : ['websocket','polling', 'flashsocket'] }).connect()
    socket.on("user connected", (listofusers)=>{
      this.usersConnected = listofusers
    })
    socket.on('new message', ()=> {
      this.mservice.getMessage()
    })
    
  }
  
  ngAfterViewInit(){
    let divMessage:HTMLElement = document.querySelector('.messages')
    divMessage.scrollTop = 300
    
  }


  onSubmitMessage(event){
    event.preventDefault()
    this.mservice.sendMessage({
      message: this.message.value,
      UserId: this.user.id,
      private: false
    })
    this.message.setValue('')
  }

}
