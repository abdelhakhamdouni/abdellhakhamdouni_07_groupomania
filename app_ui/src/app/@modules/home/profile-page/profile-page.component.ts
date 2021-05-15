import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/AppState';
import User from 'src/app/models/User';
import { UserApiService } from 'src/app/@services/user-api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService: UserApiService ,private activeRoute: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  profil: User;
  userLogged: User
  modal: HTMLElement = document.querySelector('.modal')
  id: number
  image
  imagepreview
  modeEdit: boolean = false
  
  MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']
  
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params=>{
      this.id = params['id']
      this.userService.getUserFromApi(this.id)
      this.store.select('oneUser').subscribe(user => {
        console.log(user)
        this.profil = user as User
        this.imagepreview = user.avatar
        this.modal.classList.remove('show')
      })
      this.userService.getUser().subscribe(user => this.userLogged = user as User)
    })
  }
  
  showModal(){
    document.querySelector('input').blur()
    this.modal.classList.add('show')
  }
  
  showPost(id){
    this.router.navigateByUrl(`/publication/${id}`)
  }
  
  postgroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  })
  
  preview(event) {
    let files = event.target.files;
    if (files.length === 0)
    return;
    console.log(files[0].type)
    var mimeType = files[0].type;
    if(this.MIME_TYPES.indexOf(mimeType) === -1){
      alert('Format de l\'image non authorisé' )
      return 
    }
    else{ 
      var reader = new FileReader();
      this.image = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        this.imagepreview = reader.result; 
      }
    }
  }

  changeMode(){
    this.modeEdit = !this.modeEdit
  }


}
