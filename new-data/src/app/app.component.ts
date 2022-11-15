import { Component } from '@angular/core';
import {HttpService} from "./services/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'new-data';

  constructor(private httpService: HttpService) { }

  newReport(): void{
    let monto = (document.getElementById('montoInput') as HTMLInputElement).value;
    let descripcion = (document.getElementById('DescripcionInput') as HTMLInputElement).value;
    let responsable = (document.getElementById('ResponsableInput') as HTMLInputElement).value;
    let Departament = (document.getElementById('DepartmentInput') as HTMLInputElement).value;

    if (monto && descripcion && responsable && Departament){
      this.httpService.nuevoGastoGet(monto, descripcion, responsable, Departament);
    } else {
      alert("Hay datos faltan")
    }
    
    
  };
}
