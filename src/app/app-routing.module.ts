import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersComponent } from './members/members.component';
import { ConfigKittyComponent } from './config-kitty/config-kitty.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectKittyComponent } from './collection/collect-kitty/collect-kitty.component';
import { CollectFoodComponent } from './collection/collect-food/collect-food.component';
import { CollectGameComponent } from './collection/collect-game/collect-game.component';
import { CollectPunctualityComponent } from './collection/collect-punctuality/collect-punctuality.component';
import { AuthGuard } from './auth/auth.guard';
import { WinnerListComponent } from './members/winner-list/winner-list.component';
import { WinKittyComponent } from './win-kitty/win-kitty.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', redirectTo: '/collection', pathMatch: 'full' },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'winners', component: WinnerListComponent, canActivate: [AuthGuard] },
  { path: 'kitty-of-the-month', component: WinKittyComponent, canActivate: [AuthGuard] },
  { path: 'config-kitty', component: ConfigKittyComponent, canActivate: [AuthGuard] },
  {
    path: 'collection',
    component: CollectionComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'kitty', component: CollectKittyComponent },
      { path: 'food', component: CollectFoodComponent },
      { path: 'game', component: CollectGameComponent },
      { path: 'punctuality', component: CollectPunctualityComponent }
    ]
  },
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
