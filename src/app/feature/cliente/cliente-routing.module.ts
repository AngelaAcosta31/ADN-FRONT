import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';



export const routes: Routes = [
    {
        path: '',
        component: ListarClienteComponent,    
    },
    {
        path: 'crearCliente',
        component: CrearClienteComponent,
    },
    {
        path: 'editarCliente/:id',
        component: CrearClienteComponent,
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ClienteRoutingModule{}
