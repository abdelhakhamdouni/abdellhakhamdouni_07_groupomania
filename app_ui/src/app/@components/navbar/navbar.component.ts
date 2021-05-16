import { NavigationService } from './../../@services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/@services/user-api.service';
import User from 'src/app/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserApiService, private navService: NavigationService) { }

  image:string = '/assets/images/icon.svg'
  user: User
  path: string

  ngOnInit(): void {
    this.userService.getUser().subscribe(user=> this.user = user)
    this.navService.getUrl().subscribe(path => console.log(path))
    
  }



}
