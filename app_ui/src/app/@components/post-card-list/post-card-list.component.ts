import { AppState } from 'src/app/AppState';
import { Store } from '@ngrx/store';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/@services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card-list',
  templateUrl: './post-card-list.component.html',
  styleUrls: ['./post-card-list.component.scss']
})
export class PostCardListComponent implements OnInit {

  constructor( private postService: PostService ,private store: Store<AppState>) { }
  _posts

  ngOnInit(): void {
    this.postService.getLastPosts()
    this.store.select('lastPosts').subscribe(posts => this._posts = posts)
}

}