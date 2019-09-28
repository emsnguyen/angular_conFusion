import { LeaderService } from './../services/leader.service';
import { Component, OnInit } from '@angular/core';
import {Leader} from './../shared/leader';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leaders:Leader[];
  leader: Leader;
  constructor(private leaderService:LeaderService) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .then((leaders)=>this.leaders=leaders);
    this.leaderService.getFeaturedLeader()
    .then((leader)=>this.leader=leader);
  }

}
