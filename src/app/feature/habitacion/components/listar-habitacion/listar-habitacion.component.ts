import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Habitacion } from '../../shared/model/habitacion';
import { HabitacionService } from '../../shared/service/habitacion.service';

@Component({
  selector: 'app-listar-habitacion',
  templateUrl: './listar-habitacion.component.html',
  styleUrls: ['./listar-habitacion.component.css']
})
export class ListarHabitacionComponent implements OnInit {

  public listaHabitaciones:Habitacion[]=[];
  habitacion:any;
 

  displayedColumns:string[]=['id','numeroHabitacion','tipo','noCamas','noBannos','descripcion','precio','piso','estado','acciones'];
  dataSource = new MatTableDataSource<Habitacion>(this.listaHabitaciones);

  constructor(protected habitacionService:HabitacionService, private _snackBar:MatSnackBar, private route:Router) { }

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(){
    this.habitacionService.consultar().subscribe(data =>{
      this.listaHabitaciones = data;
      this.dataSource.data = this.listaHabitaciones;
    });
  }

  
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarHabitacion(habitacion:Habitacion){
    this.habitacionService.eliminarHabitacion(habitacion.id).subscribe(data=>{
      if(data ===true){
        this.habitacion.pop(habitacion);
      }
    });
    this.cargarHabitaciones();

    this._snackBar.open('La habitación se ha eliminado exitosamente','',{
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }

  actualizarHabitacion(id:number){
    this.route.navigate(['/editarHabitacion',id]);
  }



}
