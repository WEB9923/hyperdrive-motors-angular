import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { CarsService } from '../../../services/cars-service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../../ui/button/button';
import { Router } from '@angular/router';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-horizontal-scroll',
  imports: [NgOptimizedImage, CurrencyPipe, Button],
  templateUrl: './horizontal-scroll.html',
})
export class HorizontalScroll {
  carsService = inject(CarsService);
  router = inject(Router);

  scrollSectionRef = viewChild.required<ElementRef<HTMLElement>>('scrollSection');
  cardsTrackRef = viewChild.required<ElementRef<HTMLElement>>('cardsTrack');

  private scrollTween!: gsap.core.Tween;

  navigateToDetails(id: number): void {
    this.router.navigate(['/cars/details', id]);
  }

  ngAfterViewInit(): void {
    const section = this.scrollSectionRef().nativeElement;
    const cardsTrack = this.cardsTrackRef().nativeElement;

    this.scrollTween = gsap.to(cardsTrack, {
      x: -(section.scrollWidth - section.offsetWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${section.scrollWidth - section.offsetWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  ngOnDestroy(): void {
    if (this.scrollTween) {
      this.scrollTween.scrollTrigger?.kill();
      this.scrollTween.kill();
    }
  }
}
