import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule } from '@angular/forms';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Transactions } from '../pages/transactions/transactions';
import { Adding } from '../pages/adding/adding';
import { Map } from '../pages/map/map';
import {GeolocationService} from '../services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMaps} from '@ionic-native/google-maps';
import { Camera } from '@ionic-native/camera';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Transactions,
    Adding,
    Map
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Transactions,
    Adding,
    Map
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeolocationService,
    GoogleMaps,
    Camera,
  ]
})
export class AppModule {}
