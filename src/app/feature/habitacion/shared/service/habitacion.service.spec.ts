import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Habitacion } from '../model/habitacion';

import { HabitacionService } from './habitacion.service';

describe('HabitacionService', () => {
  let httpMock: HttpTestingController;
  let servicioHabitacion: HabitacionService;
  const URL = environment.endpoint + '/habitaciones';

  beforeEach( () => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HabitacionService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    servicioHabitacion = TestBed.inject(HabitacionService);
  });

  it('should be created', () => {
    const habitacionServicio: HabitacionService = TestBed.inject(HabitacionService);
    expect(habitacionServicio).toBeTruthy();
  });

  it('Deberia listar las habitaciones', () => {
    const dummyHabitaciones = [
      new Habitacion ('120', 'SENCILLA', 1, 1, 'HABITACION CON TV Y NEVERA', 40000, '1', 'D'),
      new Habitacion ('220', 'DOBLE', 1, 1, 'HABITACION CON UNA CAMA DOBLE, TV Y NEVERA', 60000, '2', 'D'),
    ];
    servicioHabitacion.consultar().subscribe(habitaciones => {
      expect(habitaciones.length).toBe(2);
      expect(habitaciones).toEqual(dummyHabitaciones);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHabitaciones);
  });

  it('Deberia crear una habitacion', () => {
    const dummyHabitacion = new Habitacion ('120', 'SENCILLA', 1, 1, 'HABITACION CON TV Y NEVERA', 40000, '1', 'D');
    servicioHabitacion.crearHabitacion(dummyHabitacion).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia eliminar una habitacion', () => {
    const dummyHabitacion = new Habitacion ('120', 'SENCILLA', 1, 1, 'HABITACION CON TV Y NEVERA', 40000, '1', 'D');
    dummyHabitacion.id = 1;
    servicioHabitacion.eliminarHabitacion(dummyHabitacion.id).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${URL}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia actualizar una haitacion', () => {
    const dummyHabitacion = new Habitacion ('120', 'SENCILLA', 1, 1, 'HABITACION CON TV Y NEVERA', 40000, '1', 'D');
    dummyHabitacion.id = 1;
    servicioHabitacion.actualizar(dummyHabitacion).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${URL}/1`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
