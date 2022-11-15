import { Component } from '@angular/core';
import {HttpServiceService} from "./services/http-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'show-results';

  topExpenser: any;
  monthSelected: any;
  yearSelected: any;

  totalMes:any;

  reportedYears: any;

  gastosMes: any;



  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.httpService.getGastos().subscribe((res:any) => {this.topExpenser = res});
    this.httpService.getReportedYears().subscribe((res:any) => {this.reportedYears = res});

    this.monthSelected = (document.getElementById('MonthInput') as HTMLInputElement).value;
    this.yearSelected = (document.getElementById('YearInput') as HTMLInputElement).value;

    this.httpService.totalMes(this.monthSelected, this.yearSelected).subscribe((res:any) => {this.totalMes = res[0]});

    this.httpService.gastosMes(this.monthSelected, this.yearSelected).subscribe((res:any) => {this.gastosMes = res});
  }

  dateUpdated(): void{
    this.monthSelected = (document.getElementById('MonthInput') as HTMLInputElement).value;
    this.yearSelected = (document.getElementById('YearInput') as HTMLInputElement).value;

    this.httpService.totalMes(this.monthSelected, this.yearSelected).subscribe((res:any) => {
      console.log(res);
      if(res[0].monto){
        this.totalMes = res[0].monto;
      }else{
        this.totalMes = "0";
      }
  });

  this.httpService.gastosMes(this.monthSelected, this.yearSelected).subscribe((res:any) => {this.gastosMes = res; console.log(res)}); 
}




  updateInstance(): void{
    this.httpService.getReportedYears().subscribe((res:any) => {this.reportedYears = res; console.log(res)});
  }
}
