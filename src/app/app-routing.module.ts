import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { UserscheduleComponent } from './userschedule/userschedule.component';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"userschedule",component:UserscheduleComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"",redirectTo:"/register",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
