import {  HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Reserva } from '../model/reserva';

import { ReservaService } from './reserva.service';

describe('ReservaService', () => {
  let httpMock: HttpTestingController;
  let servicioReserva: ReservaService;
  const URL = environment.endpoint + '/reservas';

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    servicioReserva = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    const reservaServicio: ReservaService = TestBed.inject(ReservaService);
    expect(reservaServicio).toBeTruthy();
  });

  it('Deberia listar las reservas', () => {
    const dummyReservas = [
      new Reserva (584000, '2022-02-02', '2022-02-10', 1, 1),
      new Reserva (500000,  '2022-03-22', '2022-04-10', 1, 1),
    ];
    servicioReserva.consultar().subscribe(reservas => {
      expect(reservas.length).toBe(2);
      expect(reservas).toEqual(dummyReservas);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservas);
  });

  it('Deberia crear una reserva', () => {
    const dummyReserva = new Reserva (500000, '2022-03-22', '2022-04-10', 1, 1);
    servicioReserva.crearReserva(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia eliminar una reserva', () => {
    const dummyReserva = new Reserva (500000, '2022-03-22', '2022-04-10', 1, 1);
    dummyReserva.id = 1;
    servicioReserva.eliminarReserva(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${URL}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia actualizar reserva', () => {
    const dummyReserva = new Reserva (500000, '2022-03-22', '2022-04-10', 1, 1);
    dummyReserva.id = 1;
    servicioReserva.actualizar(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${URL}/1`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia buscar por id cliente', () => {
    const dummyReserva = 1;
    servicioReserva.consultarPorId(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${URL}/id_cliente/1`);
    expect(req.request.method).toBe('GET');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  
  it('Deberia buscar por id reserva', () => {
    const dummyReserva = 1;
    servicioReserva.consultarPorIdReserva(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${URL}/idReserva/1`);
    expect(req.request.method).toBe('GET');
    req.event(new HttpResponse<boolean>({body: true}));
  });

});
