import { ActivatedRoute } from '@angular/router';
import  Post  from 'src/app/models/Post';
import { Observable } from 'rxjs';
import { UserApiService } from './../../../@services/user-api.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/@services/post.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  
  constructor(private postService: PostService, private userService: UserApiService, private store: Store<AppState>, private router: ActivatedRoute) { }

  post: Post;
  user;
  modal: HTMLElement = document.querySelector('.modal')
  id: number

  ngOnInit(): void {
    this.postService.getPost()
    this.id = this.router.snapshot.params['id']
    
    this.postService.getOnePostById(this.id).subscribe(post => this.post = post)
    
    this.userService.getUser().subscribe(user => {
      this.user = user})
      this.modal.classList.remove('show')
  }

  showModal(){
    document.querySelector('input').blur()
    this.modal.classList.add('show')
  }

}
