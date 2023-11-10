import {Component, EventEmitter, Output, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import {Video} from "../video";
import {VideosDataService} from "../videos-data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnChanges{

  constructor(private vdata:VideosDataService) {
  }
  // videos$: Video[] = [
  //   {url:'/url', name:'v1', description:'d1'},
  //   {name:'v2', description:'d2',url:'/url2'}
  // ]

  @Input() videos!: Video[];

  @Output() selectedVideo = new EventEmitter<Video>();

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges) {
    this.videos = changes['videos'].currentValue
  }



  selectVideo(video: Video){
    this.selectedVideo.emit(video)
  }

  // renderVideos(){
  //   this.videos$ = this.vdata.getVideos();
  // }
}
