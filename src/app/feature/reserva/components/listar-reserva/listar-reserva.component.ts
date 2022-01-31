import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.css']
})
export class ListarReservaComponent implements OnInit {

  public listaReservas: Reserva[] = [];
  titulo = 'Listado Reservas';
  reservas: any;
  displayedColumns: string[] = ['id', 'valor', 'fechaEntrada', 'fechaSalida', 'idHabitacion', 'idCliente', 'acciones'];
  dataSource = new MatTableDataSource<Reserva>(this.listaReservas);

  constructor(protected reservaService: ReservaService, private snackBar: MatSnackBar, private route: Router) { }

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(){
     this.reservaService.consultar().subscribe(data => {
       this.listaReservas = data;
       this.dataSource.data = this.listaReservas;
     });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarReserva(reserva: Reserva){
    this.reservaService.eliminarReserva(reserva).subscribe(data => {
      if ( data === true){
        this.reservas.pop(reserva);
      }
    });
    this.cargarReservas();

    this.snackBar.open('La reserva se ha eliminado exitosamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  actualizarReserva(id: number){
    this.route.navigate(['/editarReserva', id]);
  }

}
