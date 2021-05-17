import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import User from 'src/app/models/User';
import { UserApiService } from './../../../@services/user-api.service';
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { MessageService } from 'src/app/@services/message.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AppState } from 'src/app/AppState';

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
  messages: Message[]

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user = user)
    this.mservice.getMessage()
    this.store.select('message').subscribe(messages => this.messages = messages )
    console.log(this.messages)
    this.modal.classList.remove('show')
    console.log(this.user, this.messages)
    
  }
  
  ngAfterViewInit(){
    console.log('init')
    let divMessage:HTMLElement = document.querySelector('.messages')
    divMessage.scrollTop = 300
    console.log(divMessage.scrollHeight, divMessage.clientHeight)
    
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
