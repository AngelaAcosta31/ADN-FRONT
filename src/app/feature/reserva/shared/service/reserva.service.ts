import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../model/reserva';

const URL = environment.endpoint + '/reservas';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ReservaService {

  constructor(protected http: HttpService) { }

  public consultar(){
    return this.http.doGet<Reserva[]>(`${URL}`, this.http.optsName('Listar Reservas'));
  }

  public crearReserva(reserva: Reserva){
    return this.http.doPost<Reserva, boolean>(`${URL}`, reserva);
  }

  public eliminarReserva(reserva: Reserva){
    return this.http.doDelete<boolean>(`${URL}/${reserva.id}`, this.http.optsName('Eliminar Reserva'));
  }

  public actualizar(reserva: Reserva){
    return this.http.doPut<Reserva, boolean>(`${URL}/${reserva.id}`, reserva, this.http.optsName('actualizar reserva'));
  }

  public consultarPorId(id: number): Observable<any>{
    return this.http.doGet<Reserva>(`${URL}/id_cliente/${id}`, this.http.optsName('consultar por id cliente'));
  }

  public consultarPorIdReserva(idReserva: number): Observable<any>{
    return this.http.doGet<Reserva>(`${URL}/idReserva/${idReserva}`, this.http.optsName('Consultar por idReserva'));
  }

}
