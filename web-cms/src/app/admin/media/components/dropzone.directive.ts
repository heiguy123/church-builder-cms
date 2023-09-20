import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropzone]',
  standalone: true
})
export class DropzoneDirective {
  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('style.opacity') opacity = '1';
  @HostBinding('style.border') border = '2px dashed #ccc';

  @HostListener('dragover', ['$event']) public onDragOver(evt: any): any {
    evt.preventDefault();
    evt.stopPropagation();
    this.opacity = '0.8';
    this.border = '2px dotted #FF4D2A';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any): any {
    evt.preventDefault();
    evt.stopPropagation();
    this.opacity = '1';
    this.border = '2px dashed #ccc';
  }

  @HostListener('drop', ['$event']) public ondrop(evt: any): any {
    evt.preventDefault();
    evt.stopPropagation();
    this.opacity = '1';
    this.border = '2px dashed #ccc';
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }
}
