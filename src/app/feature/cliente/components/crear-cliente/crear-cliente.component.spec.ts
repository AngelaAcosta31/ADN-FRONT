import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClienteRoutingModule } from '../../cliente-routing.module';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';

import { CrearClienteComponent } from './crear-cliente.component';

describe('CrearClienteComponent', () => {
  let component: CrearClienteComponent;
  let fixture: ComponentFixture<CrearClienteComponent>;
  let clienteService: ClienteService;
  const detalleCliente = new Cliente('prueba','unitaria','1258741','25874136','prueba@GMAIL.COM','M','2000-04-14','CALLE 22');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearClienteComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ClienteRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [ ClienteService, DatePipe, MatSnackBar]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearClienteComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'crearCliente').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('El formulario es inavlido porque esta vacio',()=>{
    expect(component.formulario.valid).toBeFalsy();
  });
  
  it(`Comprobar que sea 'Registrar Clientes'`,()=>{
    expect(component.titulo).toEqual('Registrar Clientes');
  })
 

  it('Deberia crear el cliente',()=>{
    component.formulario.controls.nombre.setValue(detalleCliente.nombre);
    component.formulario.controls.apellido.setValue(detalleCliente.apellido);
    component.formulario.controls.numeroIdentificacion.setValue(detalleCliente.numeroIdentificacion);
    component.formulario.controls.telefono.setValue(detalleCliente.telefono);
    component.formulario.controls.correo.setValue(detalleCliente.correo);
    component.formulario.controls.sexo.setValue(detalleCliente.sexo);
    component.formulario.controls.fechaNacimiento.setValue(detalleCliente.fechaNacimiento);
    component.formulario.controls.direccion.setValue(detalleCliente.direccion);
    expect(component.formulario.valid).toBeTruthy();
    component.guardarCliente();
  })
  
});
