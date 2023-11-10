import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoContainerComponent } from './video-container/video-container.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router'
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SafePipe } from './safe.pipe';
import { LoginComponent } from './login/login.component';
import { UpdateVideoComponent } from './update-video/update-video.component';
import { WelcomComponent } from './welcom/welcom.component';
import { SignupComponent } from './signup/signup.component';
import {AuthInterceptor} from "./auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    VideoContainerComponent,
    VideoListComponent,
    VideoDetailComponent,
    SafePipe,
    LoginComponent,
    UpdateVideoComponent,
    WelcomComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
