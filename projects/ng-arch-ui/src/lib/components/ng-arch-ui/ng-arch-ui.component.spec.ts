import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgArchUiComponent } from './ng-arch-ui.component';

describe('NgArchUiComponent', () => {
  let component: NgArchUiComponent;
  let fixture: ComponentFixture<NgArchUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgArchUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgArchUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
