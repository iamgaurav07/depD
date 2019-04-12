import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from '../common-services/authguard.service'
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
/* import { AfterLoginComponent } from '../Layouts/after-login/after-login.component'; */
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpgradeAccountComponent } from './upgrade-account/upgrade-account.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent, pathMatch: "full", canActivate: [AuthguardService] },
  { path: 'findmatch', component: HomeComponent, pathMatch: 'full', canActivate: [AuthguardService] },
  { path: 'userprofile', component: UserProfileComponent, pathMatch: 'full', canActivate: [AuthguardService] },
  { path: 'upgradeaccount', component: UpgradeAccountComponent, pathMatch: 'full', canActivate: [AuthguardService] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
