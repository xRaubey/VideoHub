import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import * as d3 from 'd3'
import {VideosDataService} from "../videos-data.service";

@Component({
  selector: 'app-welcom',
  templateUrl: './welcom.component.html',
  styleUrls: ['./welcom.component.css']
})
export class WelcomComponent implements  OnInit{

  username: string|null= ''
  userId: string|null = ''
  d3Data = [{'_id':'Default','num':0}]

  private svg: any
  private margin = 50
  private height = 300 - this.margin*2
  private width = 600 - this.margin*2

  constructor(private account: AccountService, private vData: VideosDataService) {
  }

  ngOnInit() {
    // this.userInfo.subscribe((data)=>{
    //   this.userId = data.id
    // })

    if(localStorage.getItem('uid')){
      this.account.logout$.subscribe((logOut)=>{
        if(logOut==false){
          this.renderD3()
        }
        else{
          console.log('aaaa')
          this.userId = null
          this.username = null
          d3.selectAll("svg > *").remove();
        }
      })
    }

  }

   renderD3(){
    this.userId = JSON.parse(localStorage.getItem('uid')!).id
    this.username = JSON.parse(localStorage.getItem('uid')!).username

    this.vData.showVideosById(this.userId!).subscribe((d)=>{
      //console.log(d)
      this.d3Data = d;

      this.svg = d3.select('#svgContainer')
        .append('svg')
        .attr('height',this.height+this.margin*2)
        .attr('width',this.width+this.margin*2)
        .append('g')
        .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

      const x = d3.scaleBand()
        .domain(this.d3Data.map(d=>d._id))
        .range([0,this.width])
        .padding(0.2)

      const y = d3.scaleLinear()
        // .domain(<[Number, Number]>d3.extent(this.d3Data.map(d => {
        //   console.log(d)
        //   return d.num
        // })))
        .domain([0, <Number>d3.max(this.d3Data, d=>d.num)])
        .range([this.height,0]);

      this.svg.append('g')
        .call(d3.axisLeft(y))

      this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");


      this.svg
        .selectAll('.bars')
        .data(this.d3Data)
        .enter()
        .append('rect')
        .attr('class','bars')
        .attr('x',(d:any)=>x(d._id)!)
        .attr('y',(d:any)=>y(d.num)!)
        .attr("width", x.bandwidth())
        .attr("height", (d: any) => this.height - y(d.num))
        .attr("fill", "#d04a35");
    })
  }

}
