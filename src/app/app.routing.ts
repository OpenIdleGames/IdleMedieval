import { SpellTabComponent } from './spell-tab/spell-tab.component';
import { OptionsComponent } from './options/options.component';
import { CurVillComponent } from './cur-vill/cur-vill.component';
import { OrdersComponent } from './orders/orders.component';
import { VillageComponent } from './village/village.component';
import { SaveComponent } from './save/save.component';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module'
import { Routes, RouterModule } from '@angular/router'

import { AboutComponent } from './about/about.component'
import { HomeComponent } from './home/home.component'
import { UnitComponent } from './unit/unit.component'
import { LabComponent } from 'app/lab/lab.component';
import { TravelComponent } from 'app/travel/travel.component';
import { UiComponent } from 'app/ui/ui.component';
import { PrestigeNavComponent } from './prestige-nav/prestige-nav.component';
import { PrestigeGroupComponent } from './prestige-group/prestige-group.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: ':id', component: UnitComponent }
        ]
    },
    { path: 'lab', component: LabComponent },
    { path: 'spell', component: SpellTabComponent },
    { path: 'vil', component: CurVillComponent },
    { path: 'ord', component: OrdersComponent },
    { path: 'travel', component: TravelComponent },
    {
        path: 'options', component: OptionsComponent,
        children: [
            { path: 'save', component: SaveComponent },
            { path: 'ui', component: UiComponent },
            { path: 'about', component: AboutComponent }
        ]
    },
    {
        path: 'prest', component: PrestigeNavComponent,
        children: [
            { path: ':id', component: PrestigeGroupComponent }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: true });
