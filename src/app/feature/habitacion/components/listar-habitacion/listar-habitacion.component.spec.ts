import { CommonModule, Location  } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { HttpService } from '@core/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HabitacionRoutingModule } from '../../habitacion-routing.module';
import { Habitacion } from '../../shared/model/habitacion';
import { HabitacionService } from '../../shared/service/habitacion.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../habitacion-routing.module';

import { ListarHabitacionComponent } from './listar-habitacion.component';

describe('ListarHabitacionComponent', () => {
  let component: ListarHabitacionComponent;
  let fixture: ComponentFixture<ListarHabitacionComponent>;
  let servicioHabitacion: HabitacionService;
  let location: Location;
  let router: Router;
  const listadoHabitaciones: Habitacion[] = [
      new Habitacion ('230', 'SENCILLA', 1, 1, 'HABITACION SENCILLA', 2000, '2', 'D'),
  ];
  const detalleHabitacion = new Habitacion ('130', 'DOBLE', 2, 1, 'HABITACION CON 2 CAMAS SENCILLA', 20000, '1', 'D');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHabitacionComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HabitacionRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [HabitacionService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ListarHabitacionComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    servicioHabitacion = TestBed.inject(HabitacionService);
    spyOn(servicioHabitacion, 'consultar').and.returnValue(
      of(listadoHabitaciones)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Comprobar que el titulo sea 'Listado Habitaciones'`, () => {
    expect(component.titulo).toEqual('Listado Habitaciones');
  });

  it('Comprobar tamaño de la lista de habitaciones', () => {
    component.cargarHabitaciones();
    expect(servicioHabitacion.consultar).toHaveBeenCalled();
    expect(1).toBe(component.listaHabitaciones.length);
  });

  it('Eliminar habitación', () => {
    const spy = spyOn(servicioHabitacion, 'eliminarHabitacion').and.returnValue(
      of(true)
    );
    component.eliminarHabitacion(detalleHabitacion);
    expect(spy).toHaveBeenCalled();
    fixture.destroy();
  });
  it('Error al intentar eliminar habitación', () => {
    const spy = spyOn(servicioHabitacion, 'eliminarHabitacion').and.returnValue(
      of(false)
    );
    component.eliminarHabitacion(detalleHabitacion);
    expect(spy).toHaveBeenCalled();
  });

  it('deberia redireccionar a editar una habitacion', fakeAsync(() => {
    const ID_HABITACION = 1;
    component.actualizarHabitacion(ID_HABITACION);
    tick();
    expect(location.path()).toBe('/editarHabitacion/'+ID_HABITACION);
  }));
});
