import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserRequestComponent } from './single-user-request.component';

describe('SingleUserRequestComponent', () => {
  let component: SingleUserRequestComponent;
  let fixture: ComponentFixture<SingleUserRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleUserRequestComponent]
    });
    fixture = TestBed.createComponent(SingleUserRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
