import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SinglePostPage } from './single-post.page';

describe('SinglePostPage', () => {
  let component: SinglePostPage;
  let fixture: ComponentFixture<SinglePostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SinglePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
