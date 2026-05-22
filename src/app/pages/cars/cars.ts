import { AfterViewInit, Component, ElementRef, inject, OnInit, viewChildren } from '@angular/core';
import { CarsService } from '../../services/cars-service';
import { PageTitle } from '../../components/ui/page-title/page-title';
import { CarCard } from '../../components/shared/car-card/car-card';
import { Router } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-cars',
  imports: [PageTitle, CarCard],
  templateUrl: './cars.html',
})
export class Cars implements OnInit, AfterViewInit {
  carsService = inject(CarsService);
  router = inject(Router);

  cardElementsRef = viewChildren<CarCard, ElementRef>(CarCard, { read: ElementRef });

  navigateToDetails(carId: number): void {
    this.router.navigate(['/cars/details', carId]);
  }

  ngOnInit(): void {
    this.carsService.loadCars();
  }

  ngAfterViewInit(): void {
    const elements = this.cardElementsRef().map((el) => el.nativeElement);

    gsap.from(elements, {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.4,
    });
  }
}
