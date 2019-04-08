import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchPanelComponent } from './arch-panel.component';

describe('ArchPanelComponent', () => {
  let component: ArchPanelComponent;
  let fixture: ComponentFixture<ArchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
