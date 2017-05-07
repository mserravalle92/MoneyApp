import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import db from '../database';

import { TabsPage } from '../pages/tabs/tabs';
import { Firebase } from '@ionic-native/firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private firebase: Firebase) {

    platform.ready().then(() => {

      this.firebase.getToken()
          .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
          .catch(error => console.error('Error getting token', error));

          this.firebase.onTokenRefresh()
          .subscribe((token: string) => console.log(`Got a new token ${token}`));

          statusBar.styleDefault();
          splashScreen.hide();

        });
      }
}
