import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarHabitacionComponent } from './components/listar-habitacion/listar-habitacion.component';
import { CrearHabitacionComponent } from './components/crear-habitacion/crear-habitacion.component';
import { HabitacionRoutingModule } from './habitacion-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { HabitacionService } from './shared/service/habitacion.service';
import { HabitacionComponent } from './components/habitacion/habitacion.component';



@NgModule({
  declarations: [
    ListarHabitacionComponent,
    CrearHabitacionComponent,
    HabitacionComponent
  ],
  imports: [
    CommonModule,
    HabitacionRoutingModule,
    CoreModule,
    SharedModule
  ],providers:[HabitacionService]
})
export class HabitacionModule { }
