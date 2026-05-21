import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Hyperdrive Motors',
  },
  {
    path: 'cars',
    loadComponent: () => import('./pages/cars/cars').then((m) => m.Cars),
    title: 'Cars',
  },
  {
    path: 'cars/detail/:id',
    loadComponent: () => import('./pages/cars/detail/detail').then((m) => m.Detail),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'About',
  },
];
