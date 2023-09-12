import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTableComponent } from './request-table.component';

describe('RequestTableComponent', () => {
  let component: RequestTableComponent;
  let fixture: ComponentFixture<RequestTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTableComponent]
    });
    fixture = TestBed.createComponent(RequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
