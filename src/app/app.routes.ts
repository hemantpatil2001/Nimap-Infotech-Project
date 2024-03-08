import { Routes } from '@angular/router';
import { ShowDataComponent } from './show-data/show-data.component';
import { FootComponent } from './foot/foot.component';
import { LandingComponent } from './landing/landing.component';
import { UserShowComponent } from './user-show/user-show.component';

export const routes: Routes = [
    {
        path:'',
        component:LandingComponent
    },
    {
        path:'home',
        component:LandingComponent
    },
    
    {
        path:'show',
        component:ShowDataComponent
    },
    {
        path:'footer',
        component:FootComponent
    },
    {
        path:'userShow',
        component:UserShowComponent
    }
    
];
