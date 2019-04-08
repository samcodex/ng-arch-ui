import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiExampleDesktopComponent } from './ui-example-desktop.component';

describe('UiExampleDesktopComponent', () => {
  let component: UiExampleDesktopComponent;
  let fixture: ComponentFixture<UiExampleDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiExampleDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiExampleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
