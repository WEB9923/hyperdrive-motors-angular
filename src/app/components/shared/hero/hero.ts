import { Component, ElementRef, inject, viewChild, viewChildren } from '@angular/core';
import { cars } from '../../../mock/cars';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import gsap from 'gsap';
import { Button } from '../../ui/button/button';
import { LucideEye } from '@lucide/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, CurrencyPipe, Button],
  templateUrl: './hero.html',
})
export class Hero {
  router = inject(Router);
  cars = cars;

  leftContent = viewChildren<ElementRef<HTMLElement>>('leftContent');
  rightContent = viewChild.required<ElementRef<HTMLElement>>('rightContent');
  leftContentButton = viewChild<Button, ElementRef>(Button, { read: ElementRef });

  ngAfterViewInit(): void {
    const tl = gsap.timeline();

    const leftElements = this.leftContent().map((element) => element.nativeElement);

    tl.from(leftElements, {
      x: -100,
      autoAlpha: 0,
      stagger: { each: 0.3 },
      duration: 0.4,
      ease: 'elastic(0.45)',
    })
      .from(this.leftContentButton()?.nativeElement, {
        x: -100,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'elastic(0.45)',
      })
      .from(
        this.rightContent().nativeElement,
        {
          x: 100,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'elastic(0.55)',
        },
        '<0.3',
      );
  }

  protected readonly lucideEye = LucideEye;
}
