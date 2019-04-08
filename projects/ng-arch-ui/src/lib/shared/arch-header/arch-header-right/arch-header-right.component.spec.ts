import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchHeaderRightComponent } from './arch-header-right.component';

describe('ArchHeaderRightComponent', () => {
  let component: ArchHeaderRightComponent;
  let fixture: ComponentFixture<ArchHeaderRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchHeaderRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchHeaderRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
