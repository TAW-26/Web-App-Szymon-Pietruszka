import { TestBed } from '@angular/core/testing';

import { MessageConnect } from './message-connect';

describe('MessageConnect', () => {
  let service: MessageConnect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageConnect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
