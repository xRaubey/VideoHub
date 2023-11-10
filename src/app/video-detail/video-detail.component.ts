import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges, OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Video} from "../video";
import {VideosDataService} from "../videos-data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {UrlExistsService} from "../url-exists.service";

import urlExist from 'url-exist';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VideoType} from "../video-type";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges{

  @Input() selectedVideo : Video  = {_id: 'none', url:'', title: 'none', description: 'none'};
  @Input() selectedOption:string = ''
  @Input() showAdd: boolean = false
  @Input() vOptions: VideoType[] = [{topic:'default'}]
  @Input() userId:string|null = null
  @Output() updateList = new EventEmitter<Video[]>()
  @ViewChild('vFrame',{read: ElementRef, static:false}) vFrame!: ElementRef;

  safeUrl: string='';
  selectedTopic = 'Select a topic'

  form = this.fb.group({
    "videoTitle":['',Validators.required],
    "videoUrl":['', Validators.required],
    "videoTopic":['Other', Validators.required],
    "videoDescription":['']
  })

  constructor(private vData: VideosDataService, private fb: FormBuilder, private urlChecker: UrlExistsService) {
  }

  ngOnInit(){

  }


  createVideo(videoData:any){

    //console.log(`selected option = ${this.selectedOption}`)

    this.vData.createVideo(
      videoData.videoUrl,
      videoData.videoTitle,
      videoData.videoDescription,
      videoData.videoTopic,
      this.selectedOption,
      this.userId!
    ).subscribe((result)=>{

      this.showAdd = false;
      this.rerenderVideosList(result)
      this.selectedVideo = {_id: 'none', url:'', title: 'none', description: 'none'}
      this.form.reset({
        videoUrl:'',
        videoTitle:'',
        videoDescription:'',
        videoTopic:this.selectedOption
      })
    })
  }

  deleteVideo(video:Video){
    this.vData.deleteVideo(video._id, this.userId!, this.selectedOption).subscribe((result)=>{
      this.rerenderVideosList(result)
      this.selectedVideo = {_id: 'none', url:'none', title: 'none', description: 'none'}
    })
  }

  rerenderVideosList(videos: any[]){
    this.updateList.emit(videos)
  }

  ngAfterViewInit(): void {


  }

  ngAfterViewChecked() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedVideo']){
      this.urlChecker.checkUrlExists(changes['selectedVideo'].currentValue.url).subscribe((result)=>{
        if(result){
          this.safeUrl = changes['selectedVideo'].currentValue.url
        }
        else{
          this.safeUrl = ''
        }
      })
    }

    if(changes['vOptions'] && changes['vOptions'].currentValue[0]){
      this.selectedOption = changes['vOptions'].currentValue[0].topic
    }


  }

}
