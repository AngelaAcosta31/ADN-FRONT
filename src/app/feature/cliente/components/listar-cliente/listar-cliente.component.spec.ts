import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router} from '@angular/router';
import { CoreModule } from '@core/core.module';
import { HttpService } from '@core/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClienteRoutingModule } from '../../cliente-routing.module';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../cliente-routing.module';

import { ListarClienteComponent } from './listar-cliente.component';

describe('ListarClienteComponent', () => {
  let component: ListarClienteComponent;
  let fixture: ComponentFixture<ListarClienteComponent>;
  let clienteService: ClienteService;
  let location: Location;
  let router: Router;
  const listadoClientes: Cliente[] = [
    new Cliente ('Angela', 'Acosta', '15871', '54488', 'ange@gmail.com', 'F', '2000-07-30', 'prueba'),
    new Cliente ('paulaa', 'Acosta', '15874334', '544883543', 'pauli@gmail.com', 'F', '2000-07-30', 'pruebassw'),
  ];
  const detalleCliente = new Cliente ('paulaa', 'Acosta', '15874334', '544883543', 'pauli@gmail.com', 'F', '2000-07-30', 'pruebassw');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarClienteComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ClienteRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes)

      ],
      providers: [ClienteService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ListarClienteComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'consultar').and.returnValue(
      of(listadoClientes)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Comprobar que el titulo sea 'Listado Clientes'`, () => {
    expect(component.titulo).toEqual('Listado Clientes');
  });

  it('Comprobar tamaño de la lista de clientes', () => {
    component.cargarClientes();
    expect(clienteService.consultar).toHaveBeenCalled();
    expect(2).toBe(component.listaClientes.length);
  });

  it('Eliminar cliente', () => {
    const spy = spyOn(clienteService, 'eliminarCliente').and.returnValue(
      of(true)
    );
    component.eliminarCliente(detalleCliente);
    expect(spy).toHaveBeenCalled();
    fixture.destroy();
  });
  it('Error al intentar eliminar cliente', () => {
    const spy = spyOn(clienteService, 'eliminarCliente').and.returnValue(
      of(false)
    );
    component.eliminarCliente(detalleCliente);
    expect(spy).toHaveBeenCalled();
  });

  it('deberia redireccionar a editar cliente', fakeAsync(() => {
    const ID_CLIENTE = 1;
    component.actualizarCliente(ID_CLIENTE);
    tick();
    expect(location.path()).toBe('/editarCliente/'+ID_CLIENTE);
  }));
});
