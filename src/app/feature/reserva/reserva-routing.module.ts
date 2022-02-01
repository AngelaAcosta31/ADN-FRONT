import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';

export const routes: Routes = [
    {
        path: '',
        component: ListarReservaComponent,
    },
    {
        path: 'crearReserva',
        component: CrearReservaComponent,
    },
    {
        path: 'editarReserva/:id',
        component: CrearReservaComponent,
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ReservaRoutingModule{}
