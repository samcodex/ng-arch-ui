import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchHeaderCenterComponent } from './arch-header-center.component';

describe('ArchHeaderCenterComponent', () => {
  let component: ArchHeaderCenterComponent;
  let fixture: ComponentFixture<ArchHeaderCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchHeaderCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchHeaderCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
