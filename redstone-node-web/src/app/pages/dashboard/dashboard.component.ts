import { Component } from '@angular/core';
import { ConnectionPageComponent } from "../connection-page/connection-page.component";
import { CommandPageComponent } from "../command-page/command-page.component";
import { HomePageComponent } from "../home-page/home-page.component";
import { AboutComponent } from "../about-page/about.component";

@Component({
  selector: 'app-dashboard',
  imports: [ConnectionPageComponent, CommandPageComponent, HomePageComponent, AboutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  pageNumber:number = 0;
  menuItems = [
    { name: 'Home', icon: 'home', route: '/dashboard' },
    { name: 'Conexões', icon: 'people', route: '/profile' },
    { name: 'Estatisticas', icon: 'bar_chart', route: '/settings' },
    { name: 'Sobre', icon: 'info', route: '/help' }
  ];

  toggleMenu() {
    const sideMenu = document.querySelector('.side-menu') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    
    if (sideMenu && content) {
      sideMenu.classList.toggle('collapsed');
      content.classList.toggle('expanded');
    }
  }

  changePage(item:any){
    this.pageNumber = this.menuItems.findIndex(_item => _item.name == item.name);
  }

}
