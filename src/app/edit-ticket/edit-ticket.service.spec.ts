import { TestBed } from '@angular/core/testing';

import { EditTicketService } from './edit-ticket.service';

describe('EditTicketService', () => {
  let service: EditTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
