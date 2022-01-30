import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';
import { ReservaRoutingModule } from './reserva-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    CrearReservaComponent,
    ListarReservaComponent
  ],
  imports: [
    CommonModule,
    ReservaRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class ReservaModule { }
