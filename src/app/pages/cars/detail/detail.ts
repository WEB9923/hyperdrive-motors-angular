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

  ngAfterViewInit(): void {
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

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (params): void => {
        const carId = Number(params.get('id'));

        this.car.set(this.carsService.getCarById(carId));

        console.log(this.car());
      },
    });
  }
}
