import { TestBed } from '@angular/core/testing';

import { APIConnect } from './api-connect';

describe('MessageConnect', () => {
  let service: APIConnect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIConnect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
