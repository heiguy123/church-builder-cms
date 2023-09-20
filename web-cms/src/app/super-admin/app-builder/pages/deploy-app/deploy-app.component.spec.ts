import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployAppComponent } from './deploy-app.component';

describe('DeployAppComponent', () => {
  let component: DeployAppComponent;
  let fixture: ComponentFixture<DeployAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeployAppComponent]
    });
    fixture = TestBed.createComponent(DeployAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
