import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchButtonBarComponent } from './arch-button-bar.component';

describe('ArchButtonBarComponent', () => {
  let component: ArchButtonBarComponent;
  let fixture: ComponentFixture<ArchButtonBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchButtonBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
