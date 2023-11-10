import {Component, ElementRef, OnChanges, OnInit, ViewChild ,SimpleChanges} from '@angular/core';
import {Video} from "../video";
import {VideoListComponent} from "../video-list/video-list.component";
import {VideosDataService} from "../videos-data.service";
import {Observable} from "rxjs";
import {VideoTypeService} from "../video-type.service";
import {VideoType} from "../video-type";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent implements OnInit, OnChanges{

  selectedVideo: Video = {_id: 'none', url:'', title: 'none', description: 'none'};
  showAddVideoFlag: boolean = false

  selectedOption: string = 'Select a topic.'

  videos: Video[] = []

  enableUpdate = false

  // options = [
  //   {name:'React',value:'React'},
  //   {name:'Angular',value:'Angular'},
  //   {name:'Other',value:'Other'}
  // ]

  options:VideoType[] = []

  changeContent = ''

  @ViewChild(VideoListComponent) vList!: VideoListComponent;

  // account$ = this.account.userInfo$
  userId =  JSON.parse(localStorage.getItem('uid')!).id
  username = ''

  constructor(private vData: VideosDataService, private vType: VideoTypeService, private account: AccountService) {
  }

  ngOnInit(){
    // this.account$.subscribe((info)=>{
    //   console.log(info)
    //   this.userId = info.id;
    //   this.username = info.username
    // })
    // console.log('---')
    this.getVideosTypes();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getUserInfo(){

  }

  getSelectedVideo(video:Video){
    this.selectedVideo = video
  }

  getVideos(topic:any){
    this.vData.getVideosByTopic(topic,this.userId).subscribe((data)=>{
      this.videos = data;
    })
  }

  getVideosTypes(){
    this.vType.getAllVideoTypes().subscribe((types)=>{
      // console.log(types)
      this.options = types;
      this.selectedOption = this.options[0].topic;
      // console.log('----')
      this.getVideos(this.selectedOption);
    })
  }

  showAddVideo(){
    this.showAddVideoFlag = !this.showAddVideoFlag;
    if(this.showAddVideoFlag){
      this.enableUpdate=false
    }
  }

  getUpdatedVideos(videos: Video[]){
    this.videos = videos;
    this.selectedVideo = {_id: 'none', url:'none', title: 'none', description: 'none'};
    this.showAddVideoFlag = false
  }

  showUpdate(){
    if(this.selectedVideo._id=='none' || this.showAddVideoFlag==true){
      this.enableUpdate=false
    }
    else{
      this.enableUpdate = !this.enableUpdate
    }
    //console.log(this.enableUpdate)
  }
  updateVideo(changeInfo: HTMLSelectElement){
    //console.log(`content = ${this.changeContent}  info = ${changeInfo.value}`)
    if(this.changeContent){
      this.vData.updateSelectedVideoByField(this.selectedVideo._id,changeInfo.value,this.changeContent)
        .subscribe((result)=>{
          this.selectedVideo = result
          this.changeContent='';
          this.showAddVideoFlag = false
          this.getVideos(this.selectedOption);
        })
    }
  }


  showSelectedType(){
    this.vData.getVideosByTopic(this.selectedOption,this.userId!).subscribe((selectedVideo)=>{
      this.videos = selectedVideo
    })
  }

}
