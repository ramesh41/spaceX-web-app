import { Component, OnInit } from '@angular/core';
import { SpaceXDataService } from 'src/services/space-xdata.service';

@Component({
  selector: 'app-filter-missions',
  templateUrl: './filter-missions.component.html',
  styleUrls: ['./filter-missions.component.scss']
})
export class FilterMissionsComponent implements OnInit {
  public launchYear: any;
  public getSpaceXMissions: any;
  public yearsList: any;
  filterObj = {};
  constructor(private spaceXDataService: SpaceXDataService) { 
    this.yearsList = this.getYears(2019-20)
  }

  ngOnInit(): void {
  }

  getYears(startYear: number) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;  
    while ( startYear <= currentYear ) {
        years.push(startYear++);
    }   
    return years;
  }

  selectedYear(getY: string){
    this.filterObj['year'] = getY;
    this.getSpaceXLaunchMissions();
  }
  launchSuccessful(launchStatus: boolean){
    this.filterObj['launching'] = launchStatus;
    this.getSpaceXLaunchMissions();
  }

  landingStatus(landingStatus: boolean){
    this.filterObj['landing'] = landingStatus;
    this.getSpaceXLaunchMissions();
  }

  getSpaceXLaunchMissions(){
    this.spaceXDataService.getSpaceLaunchData(this.filterObj).subscribe(res =>{
      this.getSpaceXMissions = res; 
      this.spaceXDataService.changeMessage(this.getSpaceXMissions)    
      }
    )
  }

}
