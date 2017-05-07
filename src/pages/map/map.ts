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
import {TransactionService} from '../../services/transactions.service';

import {Transaction} from '../../database';

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

  map: GoogleMap = null;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public geolocator : GeolocationService,
              private googleMaps: GoogleMaps,
              private transactionService : TransactionService) {

  }

  ionViewDidEnter() {

    this.geolocator.get().then((result)=>{
      //cargo el mapa
      this.loadMap(result.coords.latitude,result.coords.longitude);

    }).catch((err)=> console.log(err));
  }

  loadMarkers(){
    this.transactionService.all().then((results)=>this.loadTransactionMarkers(results))
  }

  loadTransactionMarkers(transactions){

    for (let i = 0; i < transactions.length; i++) {


        let transaction = transactions[i];


        if(!transaction.hasLocation()) continue;

        let markerLocation : LatLng = new LatLng(transaction.lat,transaction.lng);
        let markerOptions : MarkerOptions = {
          position:markerLocation,
          title:transaction.title,
          icon: transaction.getImage()
        };
        this.map.addMarker(markerOptions).then((marker:Marker)=>{
          marker.showInfoWindow();
        }).catch((err)=>console.log(err));
    }
  }

  loadMap(lat,lng)
  {

    //Genero una locación mediante la clase LatLng pasandole
    // latitud y longitud
    let location : LatLng = new LatLng(lat,lng);

     let element: HTMLElement = document.getElementById('map');

     //genero el mapa mediante la clase google map
     // le paso el element de html donde se va a mostrar
     this.map = new GoogleMap(element,{
        'controls':{
          'compass':true,
          'myLocationButton':true,
          'indoorPicker':true,
          'zoom':true
        },
        'gestures':{
        'scroll':true,
        'tilt':true,
        'rotate':true,
        'zoom':true
        },
        'camera':{
          'latLng':location,
          'tilt':30,
          'zoom':15,
          'bearing':50
        }
     });

     this.map.on(GoogleMapsEvent.MAP_READY).subscribe(()=> this.loadMarkers())


}
}
