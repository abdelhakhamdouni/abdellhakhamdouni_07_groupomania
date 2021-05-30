import { ApiInterceptorInterceptor } from './@interceptor/api-interceptor.interceptor';
import { UserCardComponent } from './@components/user-card/user-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPostComponent } from './@components/new-post/new-post.component';
import { GuardGuard } from './@guard/guard.guard';
import { HomeModule } from './@modules/home/home.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './@components/footer/footer.component';
import { NavbarComponent } from './@components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './@modules/auth/auth.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { StoreModule } from '@ngrx/store';
import { postReducers } from './@store/reducers/post.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ListUsersComponent } from './@components/list-users/list-users.component';
import { userReducers } from './@store/reducers/user.reducers';
import { onePostReducers } from './@store/reducers/onePost.reducers';
import { oneUserReducers } from './@store/reducers/oneUser.reducers';
import { PostCardsComponent } from './@components/post-cards/post-cards.component';
import { PostCardListComponent } from './@components/post-card-list/post-card-list.component';
import { lastPostReducers } from './@store/reducers/lastPost.reducers';
import { MobileNavComponent } from './@components/mobile-nav/mobile-nav.component';
import { messageReducers } from './@store/reducers/message.reducers';
import { lastLikesReducers } from './@store/reducers/lastLikes.reducers';
import { logedUserReducers } from './@store/reducers/logedUser.reducers';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    NewPostComponent,
    UserCardComponent,
    ListUsersComponent,
    PostCardsComponent,
    PostCardListComponent,
    MobileNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    HomeModule,
    ReactiveFormsModule,
    CKEditorModule,
    StoreModule.forRoot({
      post : postReducers,
      user: userReducers,
      onePost: onePostReducers,
      oneUser: oneUserReducers,
      logedUser: logedUserReducers,
      lastPosts: lastPostReducers,
      lastLikes: lastLikesReducers,
      message: messageReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    
  ],
  providers: [GuardGuard,{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
