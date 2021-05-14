import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() profil;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  showProfile(id){
    this.router.navigateByUrl('/profile/'+id)
  }

}
