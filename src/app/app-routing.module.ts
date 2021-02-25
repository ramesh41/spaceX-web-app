import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';


const routes: Routes = [
  { path: "", redirectTo: "launches", pathMatch: "full" },
  { path: 'launches', component: ContentWrapperComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
