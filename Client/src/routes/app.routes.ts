import { Routes } from '@angular/router';

import { SearchDigimonComponent } from '../app/pages/search-digimon/search-digimon.component';
import { AboutComponent } from '../app/pages/about/about.component';
import { MyDigimonComponent } from '../app/pages/my-digimon/my-digimon.component';
import { NewDigimonComponent } from '../app/pages/new-digimon/new-digimon.component';

export const routes: Routes = [
    { path:'',component: AboutComponent},
    { path:'about',component: AboutComponent},
    { path:'myDigimon',component: MyDigimonComponent},
    { path:'newDigimon',component: NewDigimonComponent},
    { path:'searchDigimon',component: SearchDigimonComponent},

    
];
