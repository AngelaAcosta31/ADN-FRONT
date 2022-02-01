import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReservaRoutingModule } from '../../reserva-routing.module';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../reserva-routing.module';
import { ListarReservaComponent } from './listar-reserva.component';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  let reservaService: ReservaService;
  let location: Location;
  let router: Router;
  const listadoReservas: Reserva[] = [
    new Reserva (540000, '2022-02-03', '2022-02-10', 1, 1),
    new Reserva (140000, '2022-03-03', '2022-03-15', 1, 1),
  ];
  const detalleReserva = new Reserva (540000, '2022-02-03', '2022-02-10', 1, 1);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [
        CommonModule,
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ReservaRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [ReservaService]
    })
    .compileComponents();
  });

  beforeEach( () => {
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ListarReservaComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'consultar').and.returnValue(
      of(listadoReservas)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Comprobar que el titulo sea 'Listado Rseervas'`, () => {
    expect(component.titulo).toEqual('Listado Reservas');
  });

  it('Comprobar tamaño de la lista de reservas', () => {
    component.cargarReservas();
    expect(reservaService.consultar).toHaveBeenCalled();
    expect(2).toBe(component.listaReservas.length);
  });

  it('Eliminar reserva', () => {
    const spy = spyOn( reservaService, 'eliminarReserva').and.returnValue(
      of(true)
    );
    component.eliminarReserva(detalleReserva);
    expect(spy).toHaveBeenCalled();
  });

  it('Error al intentar eliminar reserva', () => {
    const spy = spyOn( reservaService, 'eliminarReserva').and.returnValue(
      of(false)
    );
    component.eliminarReserva(detalleReserva);
    expect(spy).toHaveBeenCalled();
  });

  it('deberia redireccionar a editar una reserva', fakeAsync(() => {
    const ID_RESERVA = 1;
    component.actualizarReserva(ID_RESERVA);
    tick();
    expect(location.path()).toBe('/editarReserva/'+ID_RESERVA);
  }));

});
