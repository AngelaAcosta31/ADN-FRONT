import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Cliente } from '@cliente/shared/model/cliente';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { CoreModule } from '@core/core.module';
import { HttpService } from '@core/services/http.service';
import { Habitacion } from '@habitacion/shared/model/habitacion';
import { HabitacionService } from '@habitacion/shared/service/habitacion.service';
import { ReservaRoutingModule } from '@reserva/reserva-routing.module';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';

import { CrearReservaComponent } from './crear-reserva.component';

describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let reservaService: ReservaService;
  let habitacionService: HabitacionService;
  let clienteService: ClienteService;
  const detalleReserva = new Reserva (5454500, '2022-02-01', '2022-02-05', 2, 1);
  const listaHabitaciones: Habitacion[] = [
    new Habitacion('100','SENCILLA',1,1,'CAMA SENCILLA',20000,'1','D'),
    new Habitacion('200','DOBLE',1,1,'CAMA DOBLE',30000,'2','D')
  ];
  const listaClientes: Cliente[] = [
    new Cliente('angela','acosta','45865','52485','ange@gmail.com','F','2000-02-14','JFD'),
    new Cliente('PAULA','RAMIREZ','5455','74554','paulis@gmail.com','F','2000-02-14','JFDfd'),
  ];
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
        SharedModule,
        BrowserAnimationsModule,
        
      ],
      providers: [ReservaService, DatePipe, HttpService, HabitacionService, ClienteService]
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
    habitacionService = TestBed.inject(HabitacionService);
    spyOn(habitacionService, 'consultar').and.returnValue(
      of(listaHabitaciones)
    );
    clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'consultar').and.returnValue(
      of(listaClientes)
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
  it('Deberia llenar el formulario de reserva', () => {
    component.reserva = detalleReserva;
    detalleReserva.id = 1;
    component.formulario.controls.id.setValue(detalleReserva.id);
    component.formulario.controls.valor.setValue(detalleReserva.valor);
    component.formulario.controls.fechaEntrada.setValue(detalleReserva.fechaEntrada);
    component.formulario.controls.fechaSalida.setValue(detalleReserva.fechaSalida);
    component.formulario.controls.idHabitacion.setValue(detalleReserva.idHabitacion);
    component.formulario.controls.idCliente.setValue(detalleReserva.idCliente);
    expect(component.formulario.valid).toBeTruthy();
    component.setValoresFormulario(detalleReserva);
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
    expect(spy).toHaveBeenCalled();
  });
});
