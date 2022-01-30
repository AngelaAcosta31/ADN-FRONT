import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';





@NgModule({
  declarations: [

    CrearClienteComponent,
    ListarClienteComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    CoreModule,
    SharedModule
  ]
})

export class ClienteModule { }
