import { Component, input, output } from '@angular/core';
import { CarsModel } from '../../../models/cars-model';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Button } from '../../ui/button/button';

@Component({
  selector: 'app-car-card',
  imports: [NgOptimizedImage, CurrencyPipe, Button],
  templateUrl: './car-card.html',
})
export class CarCard {
  car = input.required<CarsModel>();

  onViewDetails = output<number>();

  viewDetails(id: number): void {
    this.onViewDetails.emit(id);
  }
}
