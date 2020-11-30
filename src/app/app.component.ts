import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from './api-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spaceXProgram';
  queryParams = {
    launch_year: '',
    launch_success: '',
    land_success: ''
  }
  routeParam;
  limit: any =  10
  missionList: any = [];
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private apiSerive: ApiServiceService
  ) {
    const urlSnapShot = window.location.href;
    const splitUrl = urlSnapShot.split('/')
    if(splitUrl.length === 5) {
      this.queryParams.launch_year = splitUrl[4]
      console.log(this.queryParams.launch_year);
    }
    this.getLaunches(this.queryParams)

  }
  
  linkToggler($event) {
    console.log("partent");
    this.queryParams.launch_year = $event;
    console.log(this.queryParams);
    this.location.replaceState(`search/${this.queryParams.launch_year}`);
    this.getLaunches(this.queryParams)
  }

  successLaunche(event) {
    this.queryParams.launch_success = event;
    this.getLaunches(this.queryParams)

  }

  getLaunches(filter?) {
    this.apiSerive.getLaunches(this.limit, filter?filter: undefined).subscribe(res => {
      console.log(res);
      if(res) {
        this.missionList = res;
      } else {
        this.missionList = [];
      }
    })
  }

  isMissionIdAvail(missionList) {
    if(missionList && missionList.mission_id && missionList.mission_id.length > 0) {
      return true;
    } else {
      return false
    }
  }

  landingStatus(mission) { 
    const landingStatus = mission && mission.rocket && 
    mission.rocket.first_stage && mission.rocket.first_stage.cores && mission.rocket.first_stage.cores[0] && 
    mission.rocket.first_stage.cores[0].land_success || 'N/A';
    return landingStatus; 
  }

  renderImage(mission) {
    const defaultImage = '';
    if(mission && mission.links && mission.links.mission_patch_small) {
      return mission.links.mission_patch_small
    }
  }

 
}
