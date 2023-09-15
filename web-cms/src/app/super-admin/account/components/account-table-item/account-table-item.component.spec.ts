import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTableItemComponent } from './account-table-item.component';

describe('AccountTableItemComponent', () => {
  let component: AccountTableItemComponent;
  let fixture: ComponentFixture<AccountTableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountTableItemComponent]
    });
    fixture = TestBed.createComponent(AccountTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
