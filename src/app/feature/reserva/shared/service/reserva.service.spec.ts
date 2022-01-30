import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { ReservaService } from './reserva.service';

describe('ReservaService', () => {
  let servicioReserva: ReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ReservaService, HttpService]

    });
    servicioReserva = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    expect(servicioReserva).toBeTruthy();
  });
});
