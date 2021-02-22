import { Directive, ElementRef, HostListener,HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(private el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }

    @HostListener('change', ['$event']) onChange(){
        this.highlight('yellow');
    }

    private highlight(color: string) {
      console.log(this.el)
        this.el.nativeElement.style.backgroundColor = color;
      }
}