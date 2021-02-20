import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MissionComponent } from './mission/mission.component';
import { SpaceXDataService } from 'src/services/space-xdata.service';
import { FilterMissionsComponent } from './filter-missions/filter-missions.component';

@NgModule({
  declarations: [
    AppComponent,
    MissionComponent,
    FilterMissionsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [SpaceXDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
