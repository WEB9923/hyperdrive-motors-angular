import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from '../../ui/button/button';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, RouterLink, Button],
  templateUrl: './navbar.html',
})
export class Navbar {}
