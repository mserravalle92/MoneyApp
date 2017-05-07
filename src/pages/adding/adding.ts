import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Transaction} from '../../database';
import {GeolocationService} from '../../services/geolocation.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WalletService } from '../../services/wallets.service';
import { TransactionService } from '../../services/transactions.service';




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
  imageData: string;
  income: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public geolocator : GeolocationService,
              private camera: Camera,
              private walletService : WalletService,
              private transactionService : TransactionService) {
  }

  ionViewDidLoad() {
    this.model = this.cleanTransaction();
  }

  save()
  {
    if(this.shouldSend){
      this.model.amount = this.convertAmountToInt();
      this.transactionService.save(this.model).then(result=>{
        this.model = this.cleanTransaction();
        this.navCtrl.pop()
      });
    }

  }

  cleanTransaction() : Transaction{
     let transaction = new Transaction(null,"");
     transaction.walletId = this.walletService.getID();
     return transaction;
  }

  getPhoto(){

    let cameraOptions : CameraOptions={
      quality:20,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:100,
      targetHeight:100

    };

    this.camera.getPicture(cameraOptions).then((imageData)=>{
      let base64Image = 'data:image/jpeg;base64,'+imageData;
      this.imageData = base64Image;

      this.model.imageUrl=imageData;

    }, (err) => {
   // Handle error
 });
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

  convertAmountToInt(){
    let amount = parseInt(this.model.amount+"");

    if(!this.income) {amount= amount*-1};

    return amount;
  }

}
