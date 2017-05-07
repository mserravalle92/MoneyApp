import {Injectable} from "@angular/core";
import {Wallet} from '../database';

export const StorageKey = "walletID";

@Injectable()

export class WalletService{

setID(walletID){
  localStorage.setItem(StorageKey,walletID);
}
getID():number{

  return parseInt(localStorage.getItem(StorageKey));

}

update(amount:number){
  let findPromise = this.getMainWallet();

  let updatePromise = findPromise.then(wallet=>{
    Wallet.update(this.getID(),(+wallet.amount)+(amount) );
  });

  return Promise.all([findPromise,updatePromise]);

}

empty():boolean{
  return !localStorage.getItem(StorageKey);
}
  validateFirstWallet(){
    //promesa que retornaremos
    return new Promise((resolve,reject)=>{
      //Búsqueda de la primera cartera
      Wallet.first().then((wallet)=>{
        // Ejecución de la promesa al buscar
        if(!wallet){
          Wallet.createFirst().then((resultado)=>{
            console.log("creamos la primera cartera");
            this.setID(resultado);
            resolve();
          });
        }else{
          console.log("Ya había una cartera");
          this.setID(wallet.id);
          resolve();
        }
      });
    });
  }


  getMainWallet() : any{
    return Wallet.find(this.getID());
  }
}
