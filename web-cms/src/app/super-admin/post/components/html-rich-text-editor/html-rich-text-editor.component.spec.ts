import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HTMLRichTextEditorComponent } from './html-rich-text-editor.component';

describe('RichTextEditorComponent', () => {
  let component: HTMLRichTextEditorComponent;
  let fixture: ComponentFixture<HTMLRichTextEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HTMLRichTextEditorComponent]
    });
    fixture = TestBed.createComponent(HTMLRichTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
