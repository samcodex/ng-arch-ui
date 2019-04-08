import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoPanelComponent } from './book-info-panel.component';

describe('BookInfoPanelComponent', () => {
  let component: BookInfoPanelComponent;
  let fixture: ComponentFixture<BookInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookInfoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
