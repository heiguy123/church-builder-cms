import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTableItemComponent } from './request-table-item.component';

describe('RequestTableItemComponent', () => {
  let component: RequestTableItemComponent;
  let fixture: ComponentFixture<RequestTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RequestTableItemComponent],
}).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTableItemComponent]
    });
    fixture = TestBed.createComponent(RequestTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
