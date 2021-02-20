import { Component, OnInit, Input } from '@angular/core';
import { SpaceXDataService } from 'src/services/space-xdata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
  public spaceXPrograms: any;
  public noMissionFound: boolean = false;
  subscription: Subscription;
  reqObj = {};
  constructor(private spaceXDataService: SpaceXDataService) { 
    this.spaceXDataService.getSpaceLaunchData(this.reqObj).subscribe(getRes =>{
      this.spaceXPrograms = getRes;
      (this.spaceXPrograms && this.spaceXPrograms.length > 0) ? this.noMissionFound = false : this.noMissionFound = true;
    });
  }

  ngOnInit(): void {
    this.subscription = this.spaceXDataService.currentMessage.subscribe(missObj => {
      this.spaceXPrograms = missObj
      if(this.spaceXPrograms && this.spaceXPrograms.length > 0){
        this.noMissionFound = false
      } else {
        this.noMissionFound = true;
      }
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
