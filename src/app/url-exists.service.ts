import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {from, Observable, tap} from "rxjs";
import urlExist from "url-exist"

@Injectable({
  providedIn: 'root'
})
export class UrlExistsService {

  constructor(private http: HttpClient) { }

  checkUrlExists(url: string): Observable<boolean>{
    const option = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body ={
      'url':url
    }
    return this.http.post<boolean>('/url',JSON.stringify(body),option)
  }
}
