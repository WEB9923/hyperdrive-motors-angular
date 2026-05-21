import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cars',
    loadComponent: () => import('./pages/cars/cars').then((m) => m.Cars),
    title: 'Cars',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'About',
  },
];
