import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTableItemComponent } from './workspace-table-item.component';

describe('WorkspaceTableItemComponent', () => {
  let component: WorkspaceTableItemComponent;
  let fixture: ComponentFixture<WorkspaceTableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceTableItemComponent]
    });
    fixture = TestBed.createComponent(WorkspaceTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
