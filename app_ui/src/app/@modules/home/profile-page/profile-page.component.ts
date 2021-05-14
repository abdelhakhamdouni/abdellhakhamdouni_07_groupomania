import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/AppState';
import User from 'src/app/models/User';
import { UserApiService } from 'src/app/@services/user-api.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService: UserApiService ,private router: ActivatedRoute, private store: Store<AppState>) { }

  profil: User
  modal: HTMLElement = document.querySelector('.modal')
  id: number

  ngOnInit(): void {

    this.router.params.subscribe(params=>{
      this.id = params['id']
      this.userService.getUserFromApi(this.id)

      this.store.select('oneUser').subscribe(user => {
        console.log(user)
        this.profil = user as User
  
        this.modal.classList.remove('show')
      })
    })
  }

  showModal(){
    document.querySelector('input').blur()
    this.modal.classList.add('show')
  }

}
