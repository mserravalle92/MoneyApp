import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Transactions } from './transactions';

@NgModule({
  declarations: [
    Transactions,
  ],
  imports: [
    IonicPageModule.forChild(Transactions),
  ],
  exports: [
    Transactions
  ]
})
export class TransactionsModule {}
