import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  const detalleHabitacion = new Habitacion('230','SENCILLA',1,1,'HABITACION SENCILLA',2000,'2','D');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearHabitacionComponent ],
      imports:[
        CommonModule,
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HabitacionRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        CoreModule

      ],
      providers:[HabitacionService, MatSnackBar,HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHabitacionComponent);
    component = fixture.componentInstance;
    habitacionService = TestBed.inject(HabitacionService);
    spyOn(habitacionService, 'crearHabitacion').and.returnValue(
      of(true)
    )
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario es inavlido porque esta vacio',()=>{
    expect(component.formulario.valid).toBeFalsy();
    
  });

  it('Deberia crear la habitacion',()=>{
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
  })
  
});
