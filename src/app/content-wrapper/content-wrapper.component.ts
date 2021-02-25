import { Component, OnInit } from '@angular/core';
import { SpaceXDataService } from 'src/services/space-xdata.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss']
})
export class ContentWrapperComponent implements OnInit {
  public spaceXPrograms: any;
  public landingStatus: boolean = false;
  subscription: Subscription;
  reqObj = {};
  constructor(private spaceXDataService: SpaceXDataService, private route: ActivatedRoute) { 
    this.spaceXDataService.getSpaceLaunchData(this.reqObj).subscribe(getRes =>{
      this.spaceXPrograms = getRes;
    }, error => {
      console.log('Log the error : ' + error)
    }, () => {
      // 'onCompleted' callback.
      // No errors, route to new page here
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.landingStatus = params.landing_success ? params.landing_success: false;
      }
    );
    
    this.subscription = this.spaceXDataService.currentMessage.subscribe(missObj => {
      this.spaceXPrograms = missObj
    }, error => {
      console.log('Log the error : ' + error)
    }, () => {
      // 'onCompleted' callback.
      // No errors, route to new page here
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
