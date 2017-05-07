import { Component } from '@angular/core';

import { Map } from '../map/map';
import { ContactPage } from '../contact/contact';
import { Transactions } from '../transactions/transactions';
import { Wallets } from '../wallets/wallets';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Transactions;
  tab2Root = Map;
  tab3Root = Wallets;

  constructor() {

  }
}
