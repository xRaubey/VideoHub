import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Account} from "./account";
import {Router} from "@angular/router";
import {tap} from 'rxjs'

interface loginType{
  id: string|null,
  username: string|null
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  static userId: string | null = null
  static userName: string | null = null

  userSubject = new BehaviorSubject<loginType>({id:null,username:null})
  logoutSubject = new BehaviorSubject<boolean>(true);
  logout$ = this.logoutSubject.asObservable()
  userInfo$ = this.userSubject.asObservable()
  constructor(private http: HttpClient, private route: Router) { }
  verifyAccount(account:string, password: string):Observable<any>{
    return this.http.post<any>('/account/login',{account:account, password:password})
      .pipe(
        tap((val:any) => {
          // AccountService.userId = val.id
          // AccountService.userName = val.username
          // console.log(AccountService.userName)
          this.userSubject.next({id: val.id, username: val.username})
          this.logoutSubject.next(false)
        })
      )
  }
  createAccount(account: string, password: string, username: string): Observable<any>{
    return this.http.post<any>('/account/signup',{account,password,username})
      .pipe(
      tap((val:any) => {
        // AccountService.userId = val.id
        // AccountService.userName = val.username
        // console.log(AccountService.userName)
        this.userSubject.next({id: val.id, username: val.username})
        this.logoutSubject.next(false)
      })
    )
  }

  getAccountInfo(id:string):Observable<Account>|null{
    if(this.isLoggedIn()){
      return this.http.get<Account>('/account'+id)
    }
    else{
      return null
    }
  }

  isLoggedIn(){
    return localStorage.getItem('idToken') && localStorage.getItem('uid');
  }

  logOut(){
    localStorage.removeItem('idToken');
    localStorage.removeItem('uid');
    this.logoutSubject.next(true)
    this.route.navigate(['/welcome'])
  }
}
