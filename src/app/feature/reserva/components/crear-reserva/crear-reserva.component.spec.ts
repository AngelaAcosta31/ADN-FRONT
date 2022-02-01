import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { HttpService } from '@core/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReservaRoutingModule } from '../../reserva-routing.module';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';

import { CrearReservaComponent } from './crear-reserva.component';

describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let reservaService: ReservaService;
  const detalleReserva = new Reserva (5454500, '2022-02-01', '2022-02-05', 2, 1);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearReservaComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ReservaRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        SharedModule,
      ],
      providers: [ReservaService, HttpService]

    })
    .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'crearReserva').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El objeto reserva debe ser indefinido', () => {
    expect(component.reserva).toBeUndefined();
  });

  it('crear el objeto  reserva y que sea definido', () => {
    component.reserva = detalleReserva;
    expect(component.reserva).toBeDefined();
  });

  it('El formulario es inavlido porque esta vacio', () => {
    expect(component.formulario.valid).toBeFalsy();
  });

  it(`Comprobar que sea 'Registrar Reservas'`, () => {
    expect(component.titulo).toEqual('Registrar Reservas');
  });

  it('Deberia crear una reserva', () => {
    component.formulario.controls.valor.setValue(detalleReserva.valor);
    component.formulario.controls.fechaEntrada.setValue(detalleReserva.fechaEntrada);
    component.formulario.controls.fechaSalida.setValue(detalleReserva.fechaSalida);
    component.formulario.controls.idHabitacion.setValue(detalleReserva.idHabitacion);
    component.formulario.controls.idCliente.setValue(detalleReserva.idCliente);
    expect(component.formulario.valid).toBeTruthy();
    component.guardarReserva();
  });

  it('Deberia actualizar la reserva', () => {
    component.reserva = detalleReserva;
    const spy = spyOn(reservaService, 'actualizar').and.returnValue(
      of(true)
    );
    component.actualizarReserva();
    component.cargarReserva();
    expect(spy).toHaveBeenCalled();
  });
});
