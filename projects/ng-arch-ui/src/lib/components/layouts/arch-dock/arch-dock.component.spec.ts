import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchDockComponent } from './arch-dock.component';

describe('ArchDockComponent', () => {
  let component: ArchDockComponent;
  let fixture: ComponentFixture<ArchDockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchDockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
