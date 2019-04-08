import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchHeaderLeftComponent } from './arch-header-left.component';

describe('ArchHeaderLeftComponent', () => {
  let component: ArchHeaderLeftComponent;
  let fixture: ComponentFixture<ArchHeaderLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchHeaderLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchHeaderLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
