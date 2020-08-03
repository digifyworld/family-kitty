import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MembersComponent } from './members/members.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigKittyComponent } from './config-kitty/config-kitty.component';
import { LoadDataComponent } from './shared/load-data/load-data.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectKittyComponent } from './collection/collect-kitty/collect-kitty.component';
import { CollectFoodComponent } from './collection/collect-food/collect-food.component';
import { CollectGameComponent } from './collection/collect-game/collect-game.component';
import { CollectPunctualityComponent } from './collection/collect-punctuality/collect-punctuality.component';
import { MatNativeDateModule } from '@angular/material/core';
import { SidenavListComponent } from './header/sidenav-list/sidenav-list.component';


import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { WinnerListComponent } from './members/winner-list/winner-list.component';
import { WinKittyComponent } from './win-kitty/win-kitty.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MembersComponent,
    MembersListComponent,
    ConfigKittyComponent,
    CollectionComponent,
    CollectKittyComponent,
    CollectFoodComponent,
    CollectGameComponent,
    CollectPunctualityComponent,
    SidenavListComponent,
    WinnerListComponent,
    WinKittyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
