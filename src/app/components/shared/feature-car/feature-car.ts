import { Component, ElementRef, viewChild, viewChildren } from '@angular/core';
import { cars } from '../../../mock/cars';
import { NgOptimizedImage } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-feature-car',
  imports: [NgOptimizedImage],
  templateUrl: './feature-car.html',
})
export class FeatureCar {
  readonly challenger = cars.find((car) => car.id === 14);

  scrollWrapper = viewChild.required<ElementRef<HTMLElement>>('scrollWrapper');
  scrollingCar = viewChild.required<ElementRef<HTMLDivElement>>('scrollingCar');

  contentElementsRef = viewChildren<ElementRef<HTMLElement>>('content');

  private timeline!: gsap.core.Timeline;

  ngAfterViewInit(): void {
    const wrapper = this.scrollWrapper().nativeElement;
    const car = this.scrollingCar().nativeElement;
    const contentElements = this.contentElementsRef().map((el) => el.nativeElement);

    gsap.set(contentElements, {
      y: 50,
      autoAlpha: 0,
    });

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    this.timeline
      .fromTo(
        car,
        {
          scale: 0.5,
        },
        {
          scale: 1,
          duration: 1,
          ease: 'none',
        },
      )
      .to(
        contentElements,
        {
          y: 0,
          stagger: 0.2,
          autoAlpha: 1,
          duration: 0.5,
        },
        '+=0.3',
      );
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.scrollTrigger?.kill();
      this.timeline.kill();
    }
  }
}
