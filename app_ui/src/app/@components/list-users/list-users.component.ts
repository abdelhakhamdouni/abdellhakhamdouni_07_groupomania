import { UserApiService } from './../../@services/user-api.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import User from 'src/app/models/User';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  constructor(private userService: UserApiService, private store: Store<AppState>) { }
  users: any

  ngOnInit(): void {
    this.userService.getUsers()
    this.users = this.store.select('user')
  }

  

}
