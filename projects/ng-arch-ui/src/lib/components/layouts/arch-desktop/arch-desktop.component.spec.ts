import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchDesktopComponent } from './arch-desktop.component';

describe('ArchDesktopComponent', () => {
  let component: ArchDesktopComponent;
  let fixture: ComponentFixture<ArchDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
