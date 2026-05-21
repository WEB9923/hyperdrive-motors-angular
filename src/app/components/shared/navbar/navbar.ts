import { Component, ElementRef, inject, viewChild, viewChildren } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '../../ui/button/button';
import gsap from 'gsap';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive, Button],
  templateUrl: './navbar.html',
})
export class Navbar {
  router = inject(Router);

  readonly navItems = viewChildren<ElementRef<HTMLElement>>('navItem');
  readonly buttonElement = viewChild<Button, ElementRef>(Button, { read: ElementRef });

  private animateNavbar(): void {
    const elements = this.navItems().map((el) => el.nativeElement);

    const tl = gsap.timeline();

    tl.from(elements, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.15,
    }).from(this.buttonElement()?.nativeElement, {
      y: -20,
      opacity: 0,
      duration: 0.4,
    });
  }

  ngAfterViewInit(): void {
    this.animateNavbar();
  }
}
