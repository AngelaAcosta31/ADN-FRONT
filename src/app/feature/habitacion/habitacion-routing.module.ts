import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearHabitacionComponent } from './components/crear-habitacion/crear-habitacion.component';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { ListarHabitacionComponent } from './components/listar-habitacion/listar-habitacion.component';

export const routes: Routes = [
    {
        path: '' ,
        component: HabitacionComponent,
        children:[

            {
                path: '' ,
                component: ListarHabitacionComponent,
            },
            {
                path: 'crearHabitacion',
                component: CrearHabitacionComponent,
            },
            {
                path: 'editarHabitacion/:id',
                component: CrearHabitacionComponent,
            }
        ]
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class HabitacionRoutingModule{}
