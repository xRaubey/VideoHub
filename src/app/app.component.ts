import { Component, OnInit } from '@angular/core';
import {AccountService} from "./account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'meanstack';
  userSubject$ = this.account.userSubject.asObservable()
  userId!: string
  username!: string
  userInfo!: any


  constructor(public account: AccountService) {
  }

  ngOnInit() {
    if(localStorage.getItem('uid')){
      this.userId = JSON.parse(localStorage.getItem('uid')!).id
      this.username = JSON.parse(localStorage.getItem('uid')!).username
      // this.account.getAccountInfo(this.userId)?.subscribe((d)=>{
      //   this.userInfo = d;
      //   console.log(`user info = ${this.userInfo}`)
      // })
    }
    else{
      this.userSubject$.subscribe((d)=>{
        this.userId= d.id!
        this.username = d.username!

        // this.account.getAccountInfo(this.userId)?.subscribe((d)=>{
        //   this.userInfo = d;
        //   console.log(`user info = ${this.userInfo}`)
        // })
      })
    }
  }


}
