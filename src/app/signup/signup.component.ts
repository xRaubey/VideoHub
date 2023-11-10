import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {AuthInterceptor} from "../auth.interceptor";
import {catchError} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = this.fb.group({
    'account':['',[Validators.required, Validators.minLength(6)]],
    'password':['',[Validators.required, Validators.minLength(6)]],
    'check':['',[Validators.required, Validators.minLength(6)]],
    'username':['',[Validators.required, Validators.minLength(6)]]
  })
  constructor(private route: Router, private fb: FormBuilder, private account: AccountService) {
  }

  loginToVideos(){
    //console.log(this.signupForm.value)
    if(this.signupForm.value.account && this.signupForm.value.password && this.signupForm.value.username){
      if(this.signupForm.value.password==this.signupForm.value.check){
        this.account.createAccount(this.signupForm.value.account, this.signupForm.value.password, this.signupForm.value.username)
          .subscribe({
            next: (result)=>{
              console.log(result);
              localStorage.setItem('idToken',result.idToken)
              localStorage.setItem('uid',JSON.stringify({id:result.id,username:result.username}))
              // AuthInterceptor.idToken = result.idToken
              //AccountService.userId = result.id
              //console.log(AccountService.userId)
              this.route.navigate(['/videos']);
            },
            error: (err)=>{
              console.log(`singup error ${err}`)
            }
          })
      }
      else{
        alert('Check both password match!')
      }
    }
  }
  goHome(){
    this.route.navigate(['/welcome'])
  }
}
