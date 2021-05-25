import { Component, OnInit } from '@angular/core';
import { AuthService } from './@services/auth.service';
import {io} from 'socket.io-client'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService){
  }

  title = 'grp-frontend';
  isUserLogged: boolean;

  ngOnInit(){
    this.authService.getLoggedUser().subscribe(bool => this.isUserLogged = bool)
    console.log(this.isUserLogged)
    if(!localStorage.getItem('post_hided')) localStorage.setItem('post_hided', JSON.stringify([]))
    document.body.setAttribute('data-theme', localStorage.getItem("theme") || "light")

  }
}
