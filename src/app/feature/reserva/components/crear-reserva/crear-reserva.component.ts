import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/feature/cliente/shared/model/cliente';
import { ClienteService } from 'src/app/feature/cliente/shared/service/cliente.service';
import { Habitacion } from 'src/app/feature/habitacion/shared/model/habitacion';
import { HabitacionService } from 'src/app/feature/habitacion/shared/service/habitacion.service';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  reserva: Reserva;
  listaHabitaciones: Observable <Habitacion[] >;
  listaClientes: Observable<Cliente[]>;
  id: number;
  valor: number;
  fechaEntrada: string;
  fechaSalida: string;
  idHabitacion: number;
  idCliente: number;
  formulario: FormGroup;
  titulo = 'Registrar Reservas';

  constructor( protected servicioReserva: ReservaService,  private snackBar: MatSnackBar,
               protected servicioHabitacion: HabitacionService, protected servicioCliente: ClienteService,
               private fb: FormBuilder, private route: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerTodasLasHabitaciones();
    this.obtenerTodosLosClientes();
    this.crearReserva();
    this.cargarReserva();
  }

  crearReserva(){
    this.formulario = this.fb.group({
      id: [''],
      valor: [''],
      fechaEntrada: ['', [Validators.required]],
      fechaSalida: ['', [Validators.required]],
      idHabitacion: ['', [Validators.required]],
      idCliente: ['', [Validators.required]]
    });
  }

  crearObjetoReserva(){
    this.reserva = new Reserva (this.formulario.value.valor, this.formulario.value.fechaEntrada,
      this.formulario.value.fechaSalida, this.formulario.value.idHabitacion,
      this.formulario.value.idCliente);
  }

  guardarReserva(){
    this.crearObjetoReserva();
    this.servicioReserva.crearReserva(this.reserva).subscribe( data => {
      if ( data){
        this.route.navigate(['/reservas']);
      }
    }, (e) => {
      e.error().mensaje;
    });
    this.snackBar.open( 'La reserva fue creada exitosamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  obtenerTodasLasHabitaciones(){
    this.listaHabitaciones = this.servicioHabitacion.consultar();
  }

  obtenerTodosLosClientes(){
    this.listaClientes = this.servicioCliente.consultar();
  }

  actualizarReserva(){
    this.crearObjetoReserva();
    this.reserva.id = this.formulario.value.id;
    this.reserva.valor = this.formulario.value.valor;
    this.servicioReserva.actualizar(this.reserva).subscribe(
      () => {
        this.route.navigate(['/reservas']);
      }, er => er.error().mensaje);
  }

  setValoresFormulario(reserva){
    this.formulario.setValue({
      id: reserva.id,
      valor: reserva.valor,
      fechaEntrada: reserva.fechaEntrada,
      fechaSalida: reserva.fechaSalida,
      idHabitacion: reserva.idHabitacion,
      idCliente: reserva.idCliente
    });
  }

  cargarReserva(){
    this.activeRouter.params.subscribe(
      params => {
        const id = params['id'];
        if (id){
          this.servicioReserva.consultarPorIdReserva(id).subscribe((data) => {
            this.reserva = data;
            this.setValoresFormulario(this.reserva);
          });
        }});
  }

}
