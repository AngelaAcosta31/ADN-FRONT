import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { HttpService } from '@core/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClienteRoutingModule } from 'src/app/feature/cliente/cliente-routing.module';
import { HabitacionService } from '../../shared/service/habitacion.service';

import { ListarHabitacionComponent } from './listar-habitacion.component';

describe('ListarHabitacionComponent', () => {
  let component: ListarHabitacionComponent;
  let fixture: ComponentFixture<ListarHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHabitacionComponent ],
      imports:[
        CommonModule,
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ClienteRoutingModule,
        FormsModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers:[HabitacionService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
