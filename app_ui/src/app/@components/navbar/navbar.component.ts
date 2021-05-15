import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from 'src/app/@services/user-api.service';
import User from 'src/app/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserApiService, private routerActive: ActivatedRoute) { }

  image:string = '/assets/images/icon.svg'
  user: User

  ngOnInit(): void {
    this.userService.getUser().subscribe(user=> this.user = user)
    this.routerActive.params.subscribe(param => console.log(param))
  }



}
