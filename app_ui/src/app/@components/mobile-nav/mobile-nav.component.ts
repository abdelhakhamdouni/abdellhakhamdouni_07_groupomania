import { UserApiService } from './../../@services/user-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {

  constructor(private userService: UserApiService) { }

  user
  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user = user)
  }

}
