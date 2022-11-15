import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  public  url = "https://basedatosproyectosoa.uc.r.appspot.com";

  public nuevoGastoGet(monto: string, desc: string, resp: string, depa: string) {
    return this.http.get(`${this.url}/nuevoGastoGet?monto=`+monto+"&desc="+desc+"&resp="+resp+"&depa="+depa);
  }
}
