import { UserApiService } from './user-api.service';
import { Injectable, EventEmitter  } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Post from '../models/Post';
import * as PostAction from '../@store/actions/post.actions'
import * as OnePostAction from '../@store/actions/onePost.actions'
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

  dataUpdated:EventEmitter<any> = new EventEmitter()

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

  getOnePostById(id): void{
    this.http.get(this.url+id).subscribe((post: Post)=>{
      post.Comments = post.Comments.sort((a,b)=>{
        return a.CommentId - b.CommentId
      }) 
      this.store.dispatch(new OnePostAction.LoadPost(post as Post))
    })
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

  public updatePost(formData: FormData,id): Observable<any> {
    return this.http.put(this.url+id, formData)
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

  public setPostIdToEdit(data){
    this.dataUpdated.emit(data)
  }

}

