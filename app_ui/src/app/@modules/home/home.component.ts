import { Observable } from 'rxjs';
import { UserApiService } from './../../@services/user-api.service';
import { PostService } from './../../@services/post.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import Post from 'src/app/models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserApiService, private store: Store<AppState>) { }

  posts: Observable<Post[]>;
  user;
  modal: HTMLElement = document.querySelector('.modal')

  ngOnInit(): void {
    this.postService.getPost()
    this.posts = this.store.select('post')
    this.userService.getUser().subscribe(user => {
      this.user = user})
      this.modal.classList.remove('show')
    }

  showModal(){
    document.querySelector('input').blur()
    this.modal.classList.add('show')
  }

}
