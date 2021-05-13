import { UserApiService } from './user-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Post from '../models/Post';
import * as PostAction from '../@store/actions/post.actions'
import { Store } from '@ngrx/store';
import { AppState } from '../AppState';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: string = "http://localhost:8000/api/posts/"

  posts: Post[]

  constructor(protected http: HttpClient, private store: Store<AppState>, private userService: UserApiService,) { }

  public getPost(): void {
    this.http.get(this.url)
      .pipe(
          map(
              (posts:[]) => posts.filter(
                (post:Post)=> ( JSON.parse(localStorage.getItem('post_hided')).indexOf(post.id) == -1 ))
            )
        )
      .subscribe(
        posts => this.store.dispatch(new PostAction.LoadPosts(posts as Post[]))
      )
  }

  getPostService(): Observable<Post[]> {
    return new Observable(observer => {
      this.getPost()
      this.posts ? observer.next(this.posts) : observer.error('no posts')
    })
  }

  getOnePostById(id): Observable<any>{
    return this.http.get(this.url+id).pipe(post => post )
  }


  public savePost(formData: FormData): Observable<any> {
    console.log("save post service")
    return this.http.post(this.url, formData)
      .pipe(
        res => {
          console.log(res)
          return res
        }
      )
  }

  public deletePost(id?: number): Observable<any> {
    return this.http.delete(this.url + id)
  }

  public likePost(id: number, like): void {
    let UserId:number
    this.userService.getUser().subscribe(user=> UserId = user.id)
    let PostId: number = id

    this.http.post(`${this.url}like/${id}`, {
      UserId, PostId, like
    }).subscribe(res => this.getPost())
  }

}

