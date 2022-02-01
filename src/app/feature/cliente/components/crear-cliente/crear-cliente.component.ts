import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  cliente: Cliente;
  id: number;
  nombre: string;
  apellido: string;
  numeroIdentificacion: string;
  telefono: string;
  correo: string;
  sexo: string;
  fechaNacimiento: string;
  direccion: string;
  formulario: FormGroup;
  titulo = 'Registrar Clientes';

  constructor(protected servicioCliente: ClienteService, private fb: FormBuilder,
              private router: Router, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.crearCliente();
    this.cargarClientes();
  }

  crearCliente(){
    const MAX_IDENTIFICACION = 15;
    const MAX_TELEFONO = 15;
    const MAX_SEXO = 1;
    this.formulario = this.fb.group({
      id: [''],
      nombre: ['', [ Validators.required ]],
      apellido: ['', [ Validators.required ]],
      numeroIdentificacion: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(MAX_IDENTIFICACION) ]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(MAX_TELEFONO)]],
      correo: ['', [Validators.required, Validators.email]],
      sexo: ['', [Validators.required, Validators.maxLength(MAX_SEXO)]],
      fechaNacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  crearObjetoCliente(){
    this.cliente = new Cliente(this.formulario.value.nombre, this.formulario.value.apellido,
        this.formulario.value.numeroIdentificacion, this.formulario.value.telefono,
        this.formulario.value.correo, this.formulario.value.sexo, this.formulario.value.fechaNacimiento,
        this.formulario.value.direccion);
  }

  guardarCliente(){
    this.crearObjetoCliente();
    this.servicioCliente.crearCliente(this.cliente).subscribe(data => {
      if ( data ){
        this.router.navigate(['/clientes']);
      }
    }, (e) => {
      e.error(e);
    });
    this.snackBar.open('El cliente fue creado exitosamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  actualizar(){
    this.crearObjetoCliente();
    this.cliente.id = this.formulario.value.id;
    this.servicioCliente.actualizar(this.cliente).subscribe(() => {
      this.router.navigate(['/clientes']);
    }, err => err.error(),
    );
  }

  setValoresForm(cliente){
    this.formulario.setValue({
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      numeroIdentificacion: cliente.numeroIdentificacion,
      telefono: cliente.telefono,
      correo: cliente.correo,
      sexo: cliente.sexo,
      fechaNacimiento: cliente.fechaNacimiento,
      direccion: cliente.direccion
    });
  }

  cargarClientes(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.servicioCliente.consultarPorId(id).subscribe((data) => {
            this.cliente = data;
            this.setValoresForm(this.cliente);
          });
        }
      }
    );
  }
}

