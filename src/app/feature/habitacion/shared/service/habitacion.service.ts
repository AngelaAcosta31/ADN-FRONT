import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habitacion } from '../model/habitacion';

const URL = environment.endpoint+'/habitaciones';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  constructor(protected http:HttpService) { }

  public consultar(){
    return this.http.doGet<Habitacion[]>(`${URL}`,this.http.optsName("Listar Habitaciones"));
  }

  public crearHabitacion(habitacion:Habitacion){
    return this.http.doPost<Habitacion,boolean>(`${URL}`,habitacion);
  }

  public eliminarHabitacion(idHabitacion:number){
    return this.http.doDelete<boolean>(`${URL}/${idHabitacion}`,this.http.optsName('Eliminar Habitacion'));
  }

  public actualizar(habitacion:Habitacion){
    return this.http.doPut<Habitacion,boolean>(`${URL}/${habitacion.id}`,habitacion, this.http.optsName('actualizar habitacion'));
  }
  public consultarPorNumeroHabitacion(numeroHabitacion:string):Observable<any>{
    return this.http.doGet<Habitacion>(`${URL}/numeroHabitacion/${numeroHabitacion}`,this.http.optsName("Consultar Por habitacion"));
  }

}
