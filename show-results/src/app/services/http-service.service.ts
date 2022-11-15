import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }
  public  url = "https://basedatosproyectosoa.uc.r.appspot.com";

  
  public getGastos() {
    return this.http.get(`${this.url}/gastos`);
  }

  public getReportedYears() {
    return this.http.get(`${this.url}/fechasReportes`);
  }

  public totalMes(mes: string, año: string){
    return this.http.get(`${this.url}/totalMes?mes=`+mes+'&anio='+año);
  }

  public gastosMes(mes: string, año: string){
    return this.http.get(`${this.url}/gastosMes?mes=`+mes+'&anio='+año);
  }
}
