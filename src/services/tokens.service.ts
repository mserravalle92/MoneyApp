import {Injectable} from "@angular/core";
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokensService{
  constructor(private http:Http){}

  send(token:string){
    let data ={
      token:token,
      os:"android"
    };
    return this.http
               .post('http://bb2c75a8.ngrok.io/devices',data,this.options())
               .map((r:Response)=>r.text())
               .catch((err)=>{
                 console.log("hubo un error");
                 console.log(err.text());

                 return Observable.throw(err.text());
               })
      ;
  }

  options():RequestOptions{
    let headers = new Headers({'Content-Type':'application/json'});
    return new RequestOptions({headers:headers});
  }

}
