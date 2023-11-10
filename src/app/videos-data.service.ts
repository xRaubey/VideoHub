import { Injectable } from '@angular/core';
import {Video} from "./video";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class VideosDataService {

  constructor(private http: HttpClient) { }

  getVideos() :Observable<Video[]> {
    return this.http.get<Video[]>('/api/videos')
      .pipe(
        tap(x=>console.log(x))
      );
  }

  getVideosByTopic(topic:string, uid: string): Observable<Video[]>{
    return this.http.get<Video[]>('/api/videos/'+topic+'/'+uid)
  }

  createVideo(url:string, title: string, description: string, topic: string, current: string, uid:string): Observable<any[]> {
    return this.http.post<any[]>('/api/videos',{url:url, title: title, description: description, topic: topic, current: current, userId: uid})
  }

  updateSelectedVideoByField(id: string,field:string,value:string):Observable<Video>{
    return this.http.patch<Video>('/api/video/'+id,{field: field,value:value})
  }

  deleteVideo(id: string,uid:string, topic:string): Observable<any>{
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        _id: id,
        uid: uid,
        topic: topic
      }
    }
    return this.http.delete<any>('/api/video', option)
  }

  showVideosById(id:string):Observable<any>{
    return this.http.get<any>('/api/amount/'+id)
  }
}
