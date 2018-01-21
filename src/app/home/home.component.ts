import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {
  trigger,
  state,
  stagger,
  style,
  keyframes,
  query,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
        transition('* =>*',[
          query(':enter',style({  opacity:0 }),{optional:true}),
          query(':enter',stagger('300ms',[
            animate('.6s ease-in',keyframes([
              style({opacity:0,transform:'translateY(-75%)',offset:0}),
              style({opacity:0.5,transform:'translateY(35px)',offset:0.3}),
              style({opacity:1,transform:'translateY(0)',offset:1}),
            ]))]),{optional:true}),
 
            query(':leave',stagger('300ms',[
              animate('.6s ease-in',keyframes([
                style({opacity:1,transform:'translateY(0)',offset:0}),
                style({opacity:0.5,transform:'translateY(35px)',offset:0.3}),
                style({opacity:0,transform:'translateY(-75%)',offset:1}),
              ]))]),{optional:true})
        ])
    ])
  ]
})
export class HomeComponent implements OnInit {
itemCount:number;
btnText:string="Add an item";

goal:string="";

goals=[];
addItem(){
this.goals.push(this.goal);
this.goal='';
this.itemCount=this.goals.length;
this.dataservice.changeGoal(this.goals);
}

removeItem(i){
this.goals.splice(i,1);
this.dataservice.changeGoal(this.goals);
}
  constructor(private dataservice:DataService)
   {}

  ngOnInit() {
    
    this.dataservice.goal.subscribe(res=>this.goals = res);
    this.itemCount=this.goals.length;
    this.dataservice.changeGoal(this.goals);
  }

}
