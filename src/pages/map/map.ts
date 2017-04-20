import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

import {GeolocationService} from '../../services/geolocation.service';

/**
 * Generated class for the Map page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class Map {

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator : GeolocationService,private googleMaps: GoogleMaps) {
  }

  ngAfterViewInit() {
   this.loadMap();
  }

  loadMap()
  {
     let element: HTMLElement = document.getElementById('map');
     let map: GoogleMap = this.googleMaps.create(element);

     map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    let ionic: LatLng = new LatLng(43.0741904,-89.3809802);
    let position: CameraPosition = {
                   target: ionic,
                   zoom: 18,
                   tilt: 30
                 };
    map.moveCamera(position);
}
}
