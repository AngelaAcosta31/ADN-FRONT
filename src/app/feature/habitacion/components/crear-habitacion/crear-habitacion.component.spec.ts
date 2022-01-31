import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Habitacion } from '../../shared/model/habitacion';
import { HabitacionService } from '../../shared/service/habitacion.service';

import { CrearHabitacionComponent } from './crear-habitacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HabitacionRoutingModule } from '../../habitacion-routing.module';
import { CoreModule } from '@core/core.module';



describe('CrearHabitacionComponent', () => {
  let component: CrearHabitacionComponent;
  let fixture: ComponentFixture<CrearHabitacionComponent>;
  let habitacionService: HabitacionService;
  const detalleHabitacion = new Habitacion ('230', 'SENCILLA', 1, 1, 'HABITACION SENCILLA', 2000, '2', 'D');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearHabitacionComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HabitacionRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        CoreModule

      ],
      providers: [HabitacionService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHabitacionComponent);
    component = fixture.componentInstance;
    habitacionService = TestBed.inject(HabitacionService);
    spyOn(habitacionService, 'crearHabitacion').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El objeto habitacion debe ser indefinido', () => {
    expect(component.habitacion).toBeUndefined();
  });

  it('crear el objeto de habitacion y que sea definido', () => {
    component.habitacion = detalleHabitacion;
    expect(component.habitacion).toBeDefined();
  });
  it('El formulario es inavlido porque esta vacio', () => {
    expect(component.formulario.valid).toBeFalsy();
  });

  it(`Comprobar que sea 'Registrar Habitación'`, () => {
    expect(component.titulo).toEqual('Registrar Habitación');
  });

  it('Deberia crear la habitacion', () => {
    component.formulario.controls.numeroHabitacion.setValue(detalleHabitacion.numeroHabitacion);
    component.formulario.controls.tipo.setValue(detalleHabitacion.tipo);
    component.formulario.controls.noCamas.setValue(detalleHabitacion.noCamas);
    component.formulario.controls.noBannos.setValue(detalleHabitacion.noBannos);
    component.formulario.controls.descripcion.setValue(detalleHabitacion.descripcion);
    component.formulario.controls.precio.setValue(detalleHabitacion.precio);
    component.formulario.controls.piso.setValue(detalleHabitacion.piso);
    component.formulario.controls.estado.setValue(detalleHabitacion.estado);
    expect(component.formulario.valid).toBeTruthy();
    component.guardarHabitacion();
  });

  it('Deberia actualizar la habitacion', () => {
    component.habitacion = detalleHabitacion;
    const spy = spyOn(habitacionService, 'actualizar').and.returnValue(
      of(true)
    );
    component.actualizarHabitacion();
    expect(spy).toHaveBeenCalled();
  });
});
