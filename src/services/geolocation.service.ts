import {Injectable} from "@angular/core";
import {Geolocation,Geoposition} from '@ionic-native/geolocation';

@Injectable()

export class GeolocationService{
  constructor(private geolocation:Geolocation){}

  get(){
    //Returns promise
    return this.geolocation.getCurrentPosition();
  }
}
