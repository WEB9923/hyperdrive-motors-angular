import { Component } from '@angular/core';
import { Hero } from '../../components/shared/hero/hero';
import { FeatureCar } from '../../components/shared/feature-car/feature-car';

@Component({
  selector: 'app-home',
  imports: [Hero, FeatureCar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
