import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchFooterComponent } from './arch-footer.component';

describe('ArchFooterComponent', () => {
  let component: ArchFooterComponent;
  let fixture: ComponentFixture<ArchFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
