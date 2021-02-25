import { Component, OnInit } from '@angular/core';
import { SpaceXDataService } from 'src/services/space-xdata.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  public userSelectedYearFilter: number;
  public userSelectedLaunchFilter: any;
  public userSelectedLandingFilter: any;
  isbuttonActive: boolean = false;
  constructor(private spaceXDataService: SpaceXDataService,  private route: ActivatedRoute,
    private router: Router ) { 
    this.yearsList = this.getYears(2006)
  }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.userSelectedYearFilter = params.launch_year;
        this.userSelectedLaunchFilter = params.launch_success;
        this.userSelectedLandingFilter = params.landing_success;
        if(this.userSelectedYearFilter){
          this.filterObj['launch_year'] = this.userSelectedYearFilter;
        }
        if(this.userSelectedLaunchFilter !== undefined){
          this.filterObj['launch_success'] = this.userSelectedLaunchFilter;
        }
        if(this.userSelectedLandingFilter !== undefined){
          this.filterObj['landing_success'] = this.userSelectedLandingFilter;
        }
      });
  }
  
  getYears(startYear: number) {
    let currentYear = new Date().getFullYear(), years = [];
    for(var year = startYear; year <= (currentYear - 1); year++){
        years.push(year)
    }
    return years;
  }


  getSpaceXLaunchMissions(reqObj: any){
    this.spaceXDataService.getSpaceLaunchData(reqObj).subscribe(res =>{
      this.getSpaceXMissions = res; 
      this.spaceXDataService.changeMessage(this.getSpaceXMissions, this.userSelectedLandingFilter)    
      }
    )
  }

  launchYears(yr: any){
    if(this.userSelectedYearFilter == yr){
      delete this.filterObj['launch_year'];
      this.router.navigate([], {queryParams: {launch_year: null}, queryParamsHandling: 'merge'});
      this.getSpaceXLaunchMissions(this.filterObj);
    } else {
      this.filterObj['launch_year'] = yr;
      this.router.navigate(['/launches'], { queryParams: this.filterObj});
      this.getSpaceXLaunchMissions(this.filterObj);
    }
  }
  
  successfulLaunching(launchStatus: any){
    if(this.userSelectedLaunchFilter == launchStatus){
      delete this.filterObj['launch_success'];
      this.router.navigate([], {queryParams: {launch_success: null}, queryParamsHandling: 'merge'});
      this.getSpaceXLaunchMissions(this.filterObj);
    } else {
      this.filterObj['launch_success'] = launchStatus;
      this.router.navigate(['/launches'], { queryParams: this.filterObj });
      this.getSpaceXLaunchMissions(this.filterObj);
    }
  }

  successfulLanding(landingStatus: any){
    if(this.userSelectedLandingFilter == landingStatus){
      delete this.filterObj['landing_success'];
      this.router.navigate([], {queryParams: {landing_success: null}, queryParamsHandling: 'merge'});
      this.getSpaceXLaunchMissions(this.filterObj);
    } else {
      this.filterObj['landing_success'] = landingStatus;
      this.router.navigate(['/launches'], { queryParams: this.filterObj});
      this.getSpaceXLaunchMissions(this.filterObj);
    }
  }
}
