import { UserApiService } from './../../../@services/user-api.service';
import User from 'src/app/models/User';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user-page',
  templateUrl: './list-user-page.component.html',
  styleUrls: ['./list-user-page.component.scss']
})
export class ListUserPageComponent implements OnInit {
  
  modal: HTMLElement = document.querySelector('.modal')
  
  constructor(private store:Store<AppState>, private router: Router, private userService: UserApiService) { }
  user: User
  users: User[]

  ngOnInit(): void {
    this.modal.classList.remove('show')
    this.store.select('user').subscribe(users=> {
      console.log(users)
      this.users = users
    })
    this.userService.getUser().subscribe(user => this.user = user)
  }

  showProfile(id){
    this.router.navigateByUrl('/profile/'+id)
  }

}
