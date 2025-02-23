import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { name: 'Profile', icon: 'person', route: '/profile' },
    { name: 'Settings', icon: 'settings', route: '/settings' },
    { name: 'Help', icon: 'help', route: '/help' }
  ];

  toggleMenu() {
    const sideMenu = document.querySelector('.side-menu') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    
    if (sideMenu && content) {
      sideMenu.classList.toggle('collapsed');
      content.classList.toggle('expanded');
    }
  }
  
}
