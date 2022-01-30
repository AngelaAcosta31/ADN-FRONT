import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { HabitacionService } from './habitacion.service';

describe('HabitacionService', () => {
  let servicioHabitacion: HabitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[HabitacionService, HttpService]
    });
    servicioHabitacion = TestBed.inject(HabitacionService);
  });

  it('should be created', () => {
    expect(servicioHabitacion).toBeTruthy();
  });
});
