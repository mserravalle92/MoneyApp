import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { Transactions } from '../transactions/transactions';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Transactions;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
