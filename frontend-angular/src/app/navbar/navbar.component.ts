import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

  getNavLinkClass(path: string): string {
    const isActive = this.router.url === path;
    const base = 'relative font-bold text-white text-lg tracking-wide after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-white';
    return isActive
      ? `${base} after:w-full`
      : `${base} after:transition-all after:duration-300 after:w-0 hover:after:w-full`;
  }
}
