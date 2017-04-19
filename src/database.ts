import Dexie from '../node_modules/dexie/dist/dexie';

export class TransactionAppDB extends Dexie{
  transactions : Dexie.Table<ITransaction,number>

  constructor(){
      super("MoneyMapAppDB");

      this.version(1).stores({
        transactions:'++id,amount,lat,lng,title,imageUrl'
      });

      this.transactions.mapToClass(Transaction);
  }
}

export interface ICategory{

}

export interface ITransaction{
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;
}

export class Transaction implements ITransaction{
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;

  constructor(amount:number,title:string,lat?:number,lng?:number,id?:number,imageUrl?:string){
    this.amount = amount;
    this.title = title;
    if(lat) this.lat = lat;
    if(lng) this.lng = lng;
    if(id) this.id = id;
    if(imageUrl) this.imageUrl = imageUrl;

  }

  save(){
    return db.transactions.add(this);

  }

  setCoords(coords){
    this.lat = coords.latitude;
    this.lng = coords.longitude;
  }

  cleanCoords(){
    this.lat = null;
    this.lng = null;
  }

  static all(){
    //Transaction.all()=> Todas las transactions
    // retorna un promise
    return db.transactions.orderBy("id").reverse().toArray();
  }

}

export let db = new TransactionAppDB();
