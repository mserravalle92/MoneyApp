import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Transaction} from '../../database';
import {GeolocationService} from '../../services/geolocation.service';
import { Camera, CameraOptions } from '@ionic-native/camera';



/**
 * Generated class for the Adding page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-adding',
  templateUrl: 'adding.html',
})
export class Adding {

  model : Transaction = new Transaction(null, '');
  shouldGeolocate : boolean = false;
  shouldSend : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator : GeolocationService,private camera: Camera) {
  }

  ionViewDidLoad() {

  }

  save()
  {
    if(this.shouldSend){
      this.model.save().then(result=>{
        this.model = new Transaction(null,"");
        this.navCtrl.pop();
      });
    }

  }

  getPhoto(){

    let cameraOptions : CameraOptions={
      quality:80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit:false,
      encodingType:this.camera.EncodingType.JPEG,

    };

    this.camera.getPicture(cameraOptions).then((imageData)=>{
      alert(imageData);
    }).catch((err)=>console.log(err));
  }

  getLocation(){

    if(this.shouldGeolocate){
      this.shouldSend = false;
      this.geolocator.get().then((resultado)=>{
        this.model.setCoords(resultado.coords);
        console.log(this.model);
        this.shouldSend = true;


      }).catch((err)=>console.log(err));
    }
    else{
      this.model.cleanCoords();
      console.log(this.model);

    }


  }

}
