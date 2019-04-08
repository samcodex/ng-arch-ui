import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchActionComponent } from './arch-action.component';

describe('ArchActionComponent', () => {
  let component: ArchActionComponent;
  let fixture: ComponentFixture<ArchActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
