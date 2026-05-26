import { Component } from '@angular/core';
import { Hero } from '../../components/shared/hero/hero';
import { FeatureCar } from '../../components/shared/feature-car/feature-car';
import { HorizontalScroll } from '../../components/shared/horizontal-scroll/horizontal-scroll';

@Component({
  selector: 'app-home',
  imports: [Hero, FeatureCar, HorizontalScroll],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
