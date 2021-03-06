import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  },
  { path: 'clientes', loadChildren: () => import('./feature/cliente/cliente.module').then(mod => mod.ClienteModule)},
  { path: 'reservas', loadChildren: () => import('./feature/reserva/reserva.module').then(mod => mod.ReservaModule)},
  { path: 'habitaciones', loadChildren: () => import('./feature/habitacion/habitacion.module').then(mod => mod.HabitacionModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
