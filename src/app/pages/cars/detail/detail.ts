import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CarsService } from '../../../services/cars-service';
import { CarsModel } from '../../../models/cars-model';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

@Component({
  selector: 'app-detail',
  imports: [NgOptimizedImage, CurrencyPipe],
  templateUrl: './detail.html',
})
export class Detail implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  carsService = inject(CarsService);

  private destroyRef = inject(DestroyRef);

  car = signal<CarsModel | undefined>(undefined);

  readonly leftContentRef = viewChild.required<ElementRef<HTMLElement>>('leftContent');
  readonly rightContentRef = viewChildren<ElementRef<HTMLParagraphElement>>('rightContent');
  readonly carImageRef = viewChild.required<ElementRef<HTMLImageElement>>('carImage');
  readonly aboutSectionRef = viewChild.required<ElementRef<HTMLElement>>('aboutSection');
  readonly imageTargetRef = viewChild.required<ElementRef<HTMLElement>>('imageTarget');
  readonly aboutTextRef = viewChild.required<ElementRef<HTMLParagraphElement>>('aboutText');

  ngAfterViewInit(): void {
    this.runEntryAnimation();
    this.runScrollAnimation();
  }

  private runEntryAnimation(): void {
    const leftContentElement = this.leftContentRef().nativeElement;
    const rightContentElements = this.rightContentRef().map((el) => el.nativeElement);

    const tl = gsap.timeline();

    tl.fromTo(
      leftContentElement,
      {
        autoAlpha: 0,
        y: 70,
        scale: 1.3,
      },
      { duration: 0.7, y: 0, autoAlpha: 1, scale: 1 },
    ).fromTo(
      rightContentElements,
      { y: 30, autoAlpha: 0 },
      { autoAlpha: 1, y: 0, stagger: 0.1 },
      '-=0.2',
    );
  }
  private runScrollAnimation(): void {
    const section = this.aboutSectionRef().nativeElement;
    const imageEl = this.carImageRef().nativeElement;
    const imageTarget = this.imageTargetRef().nativeElement;
    const originalParent = imageEl.parentElement!;
    const aboutText = this.aboutTextRef().nativeElement;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(section, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'none' })
      .add((): void => {
        const state = Flip.getState(imageEl);

        if (tl.scrollTrigger?.direction === 1) {
          imageTarget.appendChild(imageEl);
        } else {
          originalParent.appendChild(imageEl);
        }

        Flip.from(state, {
          duration: 0.5,
          ease: 'power1.inOut',
          absolute: true,
        });
      }, '-=0.3')
      .fromTo(aboutText, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, ease: 'none' }, '-=0.5');
  }

  // private runScrollAnimation(): void {
  //   const section = this.aboutSectionRef().nativeElement;
  //   const imageEl = this.carImageRef().nativeElement;
  //   const imageTarget = this.imageTargetRef().nativeElement;
  //   const aboutText = this.aboutTextRef().nativeElement;
  //
  //   const originalParent = imageEl.parentElement!;
  //
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: section,
  //       start: 'top 50%',
  //       end: 'top 0%',
  //       scrub: false,
  //       // toggleActions: 'play reverse play reverse',
  //       // markers: true,
  //
  //       onEnter: () => {
  //         const state = Flip.getState(imageEl);
  //         imageTarget.appendChild(imageEl);
  //         Flip.from(state, { duration: 0.5 });
  //       },
  //       onLeaveBack: () => {
  //         const state = Flip.getState(imageEl);
  //         originalParent.appendChild(imageEl);
  //         Flip.from(state, { duration: 0.5 });
  //       },
  //     },
  //   });
  //
  //   tl.fromTo(section, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3 });
  //   tl.fromTo(aboutText, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 });
  // }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (params): void => {
        const carId = Number(params.get('id'));

        this.car.set(this.carsService.getCarById(carId));
      },
    });
  }
}
