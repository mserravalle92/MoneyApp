import {Injectable} from "@angular/core";
import {Transaction} from '../database';
import {WalletService} from './wallets.service';


@Injectable()

export class TransactionService{
  constructor(private walletService:WalletService){

  }

  all():any{
    return Transaction.all(this.walletService.getID());
  }

  save(transaction : Transaction) : any{
    let transactionSavePromise = transaction.save();

    let walletUpdatedPromise = this.walletService.update(transaction.amount);

    return Promise.all([transactionSavePromise,walletUpdatedPromise]);
  }
}
