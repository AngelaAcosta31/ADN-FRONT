import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { ClienteService } from './shared/service/cliente.service';
import { ClienteComponent } from './components/cliente/cliente.component';





@NgModule({
  declarations: [

    CrearClienteComponent,
    ListarClienteComponent,
    ClienteComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers:[ClienteService]
})

export class ClienteModule { }
