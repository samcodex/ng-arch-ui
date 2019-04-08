import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchWindowComponent } from './arch-window.component';

describe('ArchWindowComponent', () => {
  let component: ArchWindowComponent;
  let fixture: ComponentFixture<ArchWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
