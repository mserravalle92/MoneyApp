import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Wallet,IWallet} from '../../database';
import { NewWallet } from '../new-wallet/new-wallet';
import {WalletService} from '../../services/wallets.service'
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class Wallets {

  wallets : IWallet[];
  addingPage = NewWallet;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private walletService:WalletService,
              private toast: Toast) {
  }

  ionViewWillEnter(){
    Wallet.all().then((results)=> this.wallets = results);
  }

  selectWallet(wallet : Wallet){
    this.walletService.setID(wallet.id);

  }

  delete(wallet:Wallet){

    if(this.wallets.length == 1){
      return this.showToast("Debes conservar alguna billetera","center");
    }

    if(this.walletService.getID()==wallet.id){
      return this.showToast("Debes seleccionar otra billetera como la principal","center");

    }

    //Actualizo la lista de billeteras
    this.wallets = this.wallets.filter(w => {
      return w.id != wallet.id;
    });

    //Eliminarla de la BD
    wallet.destroy();
  }

  showToast(message,position:string){
    this.toast.show(message,"short",position).subscribe(toast => console.log(toast));
  }



}
