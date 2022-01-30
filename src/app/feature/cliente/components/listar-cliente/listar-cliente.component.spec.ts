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
import { ClienteRoutingModule } from '../../cliente-routing.module';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';

import { ListarClienteComponent } from './listar-cliente.component';

describe('ListarClienteComponent', () => {
  let component: ListarClienteComponent;
  let fixture: ComponentFixture<ListarClienteComponent>;
  let clienteService: ClienteService;
  const listadoClientes: Cliente[]=[
    new Cliente('Angela','Acosta','15871','54488','ange@gmail.com','F','2000-07-30','prueba'),
    new Cliente('paulaa','Acosta','15874334','544883543','pauli@gmail.com','F','2000-07-30','pruebassw'),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarClienteComponent ],
      imports:[
        CommonModule,
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ClienteRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers:[ClienteService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarClienteComponent);
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

  it('Comprobar tamaño de la lista de clientes', ()=>{
    component.cargarClientes();
    expect(clienteService.consultar).toHaveBeenCalled();
    expect(2).toBe(component.listaClientes.length);
  });
});
