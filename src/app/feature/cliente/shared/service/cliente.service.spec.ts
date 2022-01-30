import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let servicioCliente: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[ClienteService, HttpService]
    });

    servicioCliente = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(servicioCliente).toBeTruthy();
  });
});
