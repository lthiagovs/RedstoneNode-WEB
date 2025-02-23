import { Component } from '@angular/core';
import { ConnectionPageComponent } from "../connection-page/connection-page.component";
import { CommandPageComponent } from "../command-page/command-page.component";
import { HomePageComponent } from "../home-page/home-page.component";

@Component({
  selector: 'app-dashboard',
  imports: [ConnectionPageComponent, CommandPageComponent, HomePageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
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
