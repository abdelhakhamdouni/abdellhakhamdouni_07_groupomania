import { Store } from '@ngrx/store';
import { UserApiService } from './../../@services/user-api.service';
import { Component, OnInit } from '@angular/core';
import  User  from 'src/app/models/User';
import { AppState } from 'src/app/AppState';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userApiService: UserApiService, private store: Store<AppState>) { }

  profil: User
  profilId: number

  ngOnInit(): void {
    this.userApiService.getUser().subscribe(user => this.profilId = user.id)
    this.store.select('user').subscribe(users =>{
      this.profil = users.find(u => u.id === this.profilId)
    })
  }
}
