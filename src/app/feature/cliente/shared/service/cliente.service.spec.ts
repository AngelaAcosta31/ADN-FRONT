import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';


import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let httpMock: HttpTestingController;
  let servicioCliente: ClienteService;
  const URL = environment.endpoint + '/clientes';

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ClienteService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    servicioCliente = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    const clienteServicio: ClienteService = TestBed.inject(ClienteService);
    expect(clienteServicio).toBeTruthy();
  });

  it('Deberia listar los clientes', () => {
    const dummyClientes = [
      new Cliente ('Camilo', 'Lopez', '1284395', '21363', 'cam@gmail.com', 'M', '1999-12-14', 'ddhf'),
      new Cliente ('pepito', 'perez', '345785', '465566', 'pepito@gmail.com', 'M', '1999-04-14', 'ddfhes'),
    ];
    servicioCliente.consultar().subscribe(clientes => {
      expect(clientes.length).toBe(2);
      expect(clientes).toEqual(dummyClientes);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyClientes);
  });

  it('Deberia crear un cliente', () => {
    const dummyCliente = new Cliente ('pepito', 'perez', '345785',  '465566', 'pepito@gmail.com', 'M', '1999-04-14', 'ddfhes');
    servicioCliente.crearCliente(dummyCliente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia eliminar un cliente', () => {
    const dummyCliente = new Cliente('pepito', 'perez', '345785', '465566', 'pepito@gmail.com', 'M', '1999-04-14', 'ddfhes');
    dummyCliente.id = 1;
    servicioCliente.eliminarCliente(dummyCliente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${URL}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia actualizar un cliente', () => {
    const dummyCliente = new Cliente ('pepito', 'perez', '345785', '465566', 'pepito@gmail.com', 'M', '1999-04-14', 'ddfhes');
    dummyCliente.id = 1;
    servicioCliente.actualizar(dummyCliente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${URL}/1`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
