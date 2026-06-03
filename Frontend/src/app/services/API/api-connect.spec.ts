import { TestBed } from '@angular/core/testing';

import { ApiConnect } from './api-connect';

describe('ApiConnect', () => {
  let service: ApiConnect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConnect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
