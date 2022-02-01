import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitacion } from '../../shared/model/habitacion';
import { HabitacionService } from '../../shared/service/habitacion.service';

@Component({
  selector: 'app-crear-habitacion',
  templateUrl: './crear-habitacion.component.html',
  styleUrls: ['./crear-habitacion.component.css'],
})
export class CrearHabitacionComponent implements OnInit {

  habitacion: Habitacion;
  numeroHabitacion: string;
  tipo: string;
  noCamas: number;
  noBannos: number;
  descripcion: string;
  precio: number;
  piso: string;
  estado: string;
  formulario: FormGroup;
  titulo = 'Registrar Habitación';
  constructor(  protected servicioHabitacion: HabitacionService, private fb: FormBuilder,
                private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.crearHabitacion();
    this.cargarHabitacion();
  }

  crearHabitacion(){
    const MAX_NUMERO_HABITACION = 5;
    const MIN_NO_CAMAS = 1;
    const MIN_NO_BANNOS = 1;
    const MAX_DESCRIPCION = 100;
    const MAX_PISO = 2;
    const MAX_ESTADO = 1;
    this.formulario = this.fb.group({
      id: [''],
      numeroHabitacion: ['', [Validators.required, Validators.maxLength(MAX_NUMERO_HABITACION)]],
      tipo: ['', [Validators.required]],
      noCamas: ['', [Validators.required, Validators.min(MIN_NO_CAMAS)]],
      noBannos: ['', [Validators.required, Validators.min(MIN_NO_BANNOS)]],
      descripcion: ['', [Validators.required, Validators.maxLength(MAX_DESCRIPCION)]],
      precio: ['', [Validators.required]],
      piso: ['', [Validators.required, Validators.maxLength(MAX_PISO)]],
      estado: ['', [Validators.required, Validators.maxLength(MAX_ESTADO)]]
    });
  }

  crearObjetoHabitacion(){
    this.habitacion = new Habitacion ( this.formulario.value.numeroHabitacion, this.formulario.value.tipo, this.formulario.value.noCamas,
      this.formulario.value.noBannos, this.formulario.value.descripcion, this.formulario.value.precio,
      this.formulario.value.piso, this.formulario.value.estado);
  }

  guardarHabitacion(){
    this.crearObjetoHabitacion();
    this.servicioHabitacion.crearHabitacion(this.habitacion).subscribe(data => {
      if ( data ){
        this.router.navigate(['/habitaciones']);
      }
  }, (e) => {
    e.error().mensaje;
  });
  }

  actualizarHabitacion(){
    this.crearObjetoHabitacion();
    this.habitacion.id = this.formulario.value.id;
    this.servicioHabitacion.actualizar(this.habitacion).subscribe( () => {
      this.router.navigate(['/habitaciones']);
    }, er => er.error().mensaje);
  }

  setValoresFormulario(habitacion){
    this.formulario.setValue({
      id: habitacion.id,
      numeroHabitacion: habitacion.numeroHabitacion,
      tipo: habitacion.tipo,
      noCamas: habitacion.noCamas,
      noBannos: habitacion.noBannos,
      descripcion: habitacion.descripcion,
      precio: habitacion.precio,
      piso: habitacion.piso,
      estado: habitacion.estado
    });
  }

  cargarHabitacion(){
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        if ( id ) {
          this.servicioHabitacion.consultarPorNumeroHabitacion(id).subscribe(
            data => {
              this.habitacion = data;
              this.setValoresFormulario(this.habitacion);
            });
        }});
  }

}
