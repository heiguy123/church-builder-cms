import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTableItemComponent } from './post-table-item.component';

describe('PostTableItemComponent', () => {
  let component: PostTableItemComponent;
  let fixture: ComponentFixture<PostTableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostTableItemComponent]
    });
    fixture = TestBed.createComponent(PostTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
