import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../account.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    'account':['',[Validators.required]],
    'password':['',[Validators.required]]
  })

  error = ''
  constructor(private fb: FormBuilder, private route: Router, private account:AccountService) {
  }

  loginToVideos(){
    //console.log(this.loginForm.value)
    if(this.loginForm.value.account && this.loginForm.value.password){
      this.account.verifyAccount(this.loginForm.value.account, this.loginForm.value.password)
        .subscribe({
          next: (result)=>{

            localStorage.setItem('idToken',result.idToken)
            localStorage.setItem('uid',JSON.stringify({id:result.id,username:result.username}))
            // console.log(result);
            //AccountService.userId = result.id
            this.route.navigate(['/videos']);
          }
          ,error: (e)=>{
            if(e.status === 401){
              console.log(e)
              this.error='Wrong Account Info'
            }
          }
        })
    }
  }
  goHome(){
    this.route.navigate(['/welcome'])
  }
}
