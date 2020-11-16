import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatCardModule, MatButtonModule } from  '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IntroCardComponent } from './components/intro-card/intro-card.component';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { SlideFullpageComponent } from './components/slide-fullpage/slide-fullpage.component';
import { MainNavigationMenuComponent } from './main-navigation-menu/main-navigation-menu.component';
import { GraphLineComponent } from './components/graph-line/graph-line.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroCardComponent,
    SlideFullpageComponent,
    MainNavigationMenuComponent,
    GraphLineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    AngularFullpageModule,


    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
