import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
    {path: '', loadChildren: './landing/landing.module#LandingModule'},
    {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'}
];