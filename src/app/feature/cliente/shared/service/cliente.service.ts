import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';

const URL = environment.endpoint + '/clientes';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ClienteService {

  constructor(protected http: HttpService) {}

  public consultar(){
    return this.http.doGet<Cliente[]>(`${URL}`, this.http.optsName('Listar Clientes'));
  }

  public crearCliente(cliente: Cliente){
    return this.http.doPost<Cliente, boolean>(`${URL}`, cliente);
  }

  public eliminarCliente(cliente: Cliente){
    return this.http.doDelete<boolean>(`${URL}/${cliente.id}`, this.http.optsName('Eliminar Cliente'));
  }

  public actualizar(cliente: Cliente){
    return this.http.doPut<Cliente, boolean>(`${URL}/${cliente.id}`, cliente, this.http.optsName('actualizar cliente'));
  }

  public consultarPorId(id: string): Observable<any>{
    return this.http.doGet<Cliente>(`${URL}/numeroId/${id}`, this.http.optsName('consultar por id'));
  }
}
