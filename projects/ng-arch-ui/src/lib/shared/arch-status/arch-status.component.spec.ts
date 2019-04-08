import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchStatusComponent } from './arch-status.component';

describe('ArchStatusComponent', () => {
  let component: ArchStatusComponent;
  let fixture: ComponentFixture<ArchStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
