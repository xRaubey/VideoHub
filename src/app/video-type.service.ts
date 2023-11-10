import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VideoType} from "./video-type";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoTypeService {

  constructor(private http: HttpClient) { }

  getAllVideoTypes(): Observable<VideoType[]>{
    return this.http.get<VideoType[]>('/api/video-types').pipe(
      // tap(d=>console.log(d)),
      catchError( (err)=>{ console.log(err); return of([])})
  )
  }
}
