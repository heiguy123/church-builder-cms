import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppBuilderComponent } from './mobile-app-builder.component';

describe('MobileAppBuilderComponent', () => {
  let component: MobileAppBuilderComponent;
  let fixture: ComponentFixture<MobileAppBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileAppBuilderComponent]
    });
    fixture = TestBed.createComponent(MobileAppBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
