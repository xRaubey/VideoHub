import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideoContainerComponent} from "./video-container/video-container.component";
import {LoginComponent} from "./login/login.component";
import {UpdateVideoComponent} from "./update-video/update-video.component";
import {authGuardGuard} from "./auth-guard.guard";
import {WelcomComponent} from "./welcom/welcom.component";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  {path: '', redirectTo:'/videos', pathMatch:'full'},
  {path: 'videos', component: VideoContainerComponent, canActivate:[authGuardGuard], children:[
      {path: 'updateVideo',component: UpdateVideoComponent, outlet:'update' }
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'welcome', component: WelcomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
