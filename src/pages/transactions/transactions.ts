import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Transaction} from '../../database';
import {Adding} from '../adding/adding';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    // let transaction = new Transaction(20,"Primera Transaccion");
    // transaction.save();

    this.loadTransactions();
  }


loadTransactions(){
  Transaction.all()
             .then((resultados)=>{
               this.transactions = resultados
               console.log(this.transactions);
             });
}
}
