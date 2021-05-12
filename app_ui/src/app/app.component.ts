import { Component, OnInit } from '@angular/core';
import { AuthService } from './@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService){}

  title = 'grp-frontend';
  isUserLogged: boolean;

  ngOnInit(){
    this.authService.getLoggedUser().subscribe(bool => this.isUserLogged = bool)
    console.log(this.isUserLogged)
  }
}
