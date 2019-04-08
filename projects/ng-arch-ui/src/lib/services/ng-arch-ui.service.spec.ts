import { TestBed } from '@angular/core/testing';

import { NgArchUiService } from './ng-arch-ui.service';

describe('NgArchUiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgArchUiService = TestBed.get(NgArchUiService);
    expect(service).toBeTruthy();
  });
});
