import { Component, ElementRef, input, viewChild } from '@angular/core';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

@Component({
  selector: 'app-page-title',
  imports: [],
  template: `
    <h1
      #title
      class="mb-10 xl:text-3xl text-2xl text-secondary-foreground font-bold"
    >
      {{ label() }}
    </h1>
  `,
})
export class PageTitle {
  label = input.required<string>();

  titleElementRef = viewChild.required<ElementRef<HTMLHeadingElement>>('title');

  ngAfterViewInit(): void {
    const splitter = new SplitText(this.titleElementRef().nativeElement, { type: 'chars' });

    gsap.fromTo(
      splitter.chars,
      {
        autoAlpha: 0,
        y: 30,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.2,
        stagger: 0.1,

        onComplete: (): void => splitter.revert(),
      },
    );
  }
}
