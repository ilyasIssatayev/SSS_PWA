import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injectable } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatCheckboxModule,
  MatChipsModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,


} from "@angular/material";
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ReactiveFormsModule } from "@angular/forms";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { IntroCardComponent } from "./components/intro-card/intro-card.component";
import { AngularFullpageModule } from "@fullpage/angular-fullpage";
import { SlideFullpageComponent } from "./components/slide-fullpage/slide-fullpage.component";
import { MainNavigationMenuComponent } from "./main-navigation-menu/main-navigation-menu.component";
import { GraphLineComponent } from "./components/graph-line/graph-line.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { EditUseDataComponent } from './components/edit-use-data/edit-use-data.component';
import { EditUserInfoComponent } from './components/edit-user-info/edit-user-info.component';
import { VEMPageComponent } from './components/vem-page/vem-page.component';
import { EhpPageComponent } from './components/ehp-page/ehp-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RankingListPageComponent } from './components/ranking-list-page/ranking-list-page.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { TopNavMenuComponent } from './components/top-nav-menu/top-nav-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    IntroCardComponent,
    SlideFullpageComponent,
    MainNavigationMenuComponent,
    GraphLineComponent,
    LoginPageComponent,
    SettingsComponent,
    RegisterPageComponent,
    EditUseDataComponent,
    EditUserInfoComponent,
    VEMPageComponent,
    EhpPageComponent,
    AdminPageComponent,
    ProfilePageComponent,
    RankingListPageComponent,
    TopNavMenuComponent,

  ],
  imports: [
    FormsModule,
    MatDividerModule,
    ScrollingModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatChipsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    AngularFullpageModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
