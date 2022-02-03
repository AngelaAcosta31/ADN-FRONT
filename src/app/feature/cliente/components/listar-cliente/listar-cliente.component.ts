
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  public listaClientes: Cliente[] = [];
  titulo = 'Listado Clientes';
  cliente: any;
  displayedColumns: string[] = [ 'Id', 'Nombre', 'Apellido', 'NoIdentificacion',  
                                 'Telefono', 'Correo', 'Sexo', 'FechaNacimiento', 'Direccion', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>(this.listaClientes);

  constructor(protected clienteService: ClienteService, private snackBar: MatSnackBar, private route: Router) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(){
    this.clienteService.consultar().subscribe(data => {
      this.listaClientes = data;
      this.dataSource.data = this.listaClientes;
    });
  }
  /** 
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  */
  eliminarCliente(idCliente: Cliente){
    this.clienteService.eliminarCliente( idCliente).subscribe(() => {

      this.listaClientes = this.listaClientes.filter(c => c !== idCliente);

    });
    this.cargarClientes();
    this.snackBar.open( 'El cliente fue eliminado exitosamente', '' , {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  actualizarCliente(id: number){
    this.route.navigate(['/editarCliente', id]);
  }
}
