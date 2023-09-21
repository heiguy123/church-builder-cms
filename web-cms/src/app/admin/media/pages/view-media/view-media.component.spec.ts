import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMediaComponent } from './view-media.component';

describe('ViewMediaComponent', () => {
  let component: ViewMediaComponent;
  let fixture: ComponentFixture<ViewMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMediaComponent]
    });
    fixture = TestBed.createComponent(ViewMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
