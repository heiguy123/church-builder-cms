import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBuilderComponent } from './app-builder.component';

describe('AppBuilderComponent', () => {
  let component: AppBuilderComponent;
  let fixture: ComponentFixture<AppBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppBuilderComponent]
    });
    fixture = TestBed.createComponent(AppBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
