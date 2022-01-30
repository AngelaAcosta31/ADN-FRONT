import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Habitacion } from "../../shared/model/habitacion";
import { HabitacionService } from "../../shared/service/habitacion.service";

@Component({
  selector: "app-crear-habitacion",
  templateUrl: "./crear-habitacion.component.html",
  styleUrls: ["./crear-habitacion.component.css"],
})
export class CrearHabitacionComponent implements OnInit {

  habitacion:Habitacion;
  numeroHabitacion: string;
  tipo: string;
  noCamas: number;
  noBannos: number;
  descripcion: string;
  precio: number;
  piso: string;
  estado: string;
  formulario:FormGroup;
  titulo='Registrar Habitación';
  
  constructor(protected servicioHabitacion:HabitacionService, private fb:FormBuilder,private router:Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.crearHabitacion();
    this.cargarHabitacion();
  }

  crearHabitacion(){
    this.formulario = this.fb.group({
      id: [''],
      numeroHabitacion:['',[Validators.required, Validators.maxLength(5)]],
      tipo:['',[Validators.required]],
      noCamas:['',[Validators.required,Validators.min(1)]],
      noBannos:['',[Validators.required, Validators.min(1)]],
      descripcion:['',[Validators.required, Validators.maxLength(100)]],
      precio:['',[Validators.required]],
      piso:['',[Validators.required, Validators.maxLength(2)]],
      estado:['',[Validators.required,Validators.maxLength(1)]]
    });
  }

  crearObjetoHabitacion(){
    this.habitacion = new Habitacion(this.formulario.value.numeroHabitacion, this.formulario.value.tipo,this.formulario.value.noCamas,
      this.formulario.value.noBannos,this.formulario.value.descripcion,this.formulario.value.precio,
      this.formulario.value.piso, this.formulario.value.estado);
  }

  guardarHabitacion(){
    this.crearObjetoHabitacion();
    this.servicioHabitacion.crearHabitacion(this.habitacion).subscribe(data =>{
      if(data){
        this.router.navigate(['/habitaciones']);
      }
  }, (e)=>{
    (console.error(e));
  });
  }

  actualizarHabitacion(){
    this.crearObjetoHabitacion();
    this.habitacion.id = this.formulario.value.id;
    this.servicioHabitacion.actualizar(this.habitacion).subscribe(()=>{
      this.router.navigate(['/habitaciones']);
    },er =>console.log(er));
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
      params=>{
        let id = params['id'];
        if(id){
          this.servicioHabitacion.consultarPorNumeroHabitacion(id).subscribe(
            data=>{
              this.habitacion = data;
              this.setValoresFormulario(this.habitacion);
            });
        }});
  }

}
