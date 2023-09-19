import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { registerLicense } from '@syncfusion/ej2-base';

@Component({
  selector: '[app-html-rich-text-editor]',
  templateUrl: './html-rich-text-editor.component.html',
  styleUrls: ['./html-rich-text-editor.component.scss'],
  standalone: true,
  imports: [RichTextEditorModule],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class HTMLRichTextEditorComponent {

  constructor() { 
    registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1NpRGtGfV5yd0VHYFZVTHxfRE0DNHVRdkdgWXZfeHZXQmhcV01xVkQ=');
  }

}
