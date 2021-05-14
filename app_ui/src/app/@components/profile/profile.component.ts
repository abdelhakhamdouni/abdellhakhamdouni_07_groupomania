import { UserApiService } from './../../@services/user-api.service';
import { Component, OnInit } from '@angular/core';
import  User  from 'src/app/models/User';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userApiService: UserApiService) { }

  profil: User

  ngOnInit(): void {
    this.userApiService.getUser().subscribe(user => {
      this.profil = user})
  }


}
