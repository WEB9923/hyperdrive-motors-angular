import { Injectable, signal } from '@angular/core';
import { CarsModel } from '../models/cars-model';
import { cars as mockCars } from '../mock/cars';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private readonly LOCALSTORAGE_KEY = 'cars_data';

  private _cars = signal<CarsModel[]>([]);

  readonly cars = this._cars.asReadonly();

  loadCars(): void {
    const data = localStorage.getItem(this.LOCALSTORAGE_KEY);

    const filteredMock = mockCars.filter((car): boolean => car.id !== 14);

    if (data) {
      try {
        const parsed = JSON.parse(data);

        this._cars.set(parsed);
      } catch {
        localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(filteredMock));
      }
    } else {
      localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(filteredMock));

      this._cars.set(filteredMock);
    }
  }

  getCarById(id: number): CarsModel | undefined {
    return this._cars().find((car): boolean => car.id === id);
  }

  constructor() {
    this.loadCars();
  }
}
