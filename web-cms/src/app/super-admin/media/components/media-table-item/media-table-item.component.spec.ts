import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTableItemComponent } from './media-table-item.component';

describe('MediaTableItemComponent', () => {
  let component: MediaTableItemComponent;
  let fixture: ComponentFixture<MediaTableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaTableItemComponent]
    });
    fixture = TestBed.createComponent(MediaTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
