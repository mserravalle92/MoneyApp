import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Transaction} from '../../database';
import {Adding} from '../adding/adding';
import {WalletService} from '../../services/wallets.service'
import { TransactionService } from '../../services/transactions.service'
import {IWallet} from '../../database';




/**
 * Generated class for the Transactions page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class Transactions {

  title : string = "Movimientos";
  transactions: any;
  addingPage = Adding;
  wallet : IWallet = {amount:0,name:""};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private walletService : WalletService,
              private transactionService : TransactionService
            ) {
  }



  ionViewWillEnter() {

    if(this.walletService.empty()){
      this.walletService.validateFirstWallet();
    }

    this.loadTransactions();
    this.loadWallet();

  }


loadTransactions(){
  this.transactionService.all()
             .then((resultados)=>{
               this.transactions = resultados
             });
}

loadWallet(){
  this.walletService.getMainWallet().then(wallet=> this.wallet = wallet);
}

}
