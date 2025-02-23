import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-command-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './command-page.component.html',
  styleUrl: './command-page.component.css'
})
export class CommandPageComponent {
  searchQuery = '';
  bots = [
    { name: 'Bot 1', health: 80, hunger: 40, active: false },
    { name: 'Bot 2', health: 60, hunger: 70, active: false },
    { name: 'Bot 3', health: 90, hunger: 30, active: false }
  ];
  scripts = [
    { title: 'Auto Farm', description: 'Farms resources automatically', running: true },
    { title: 'Guard Duty', description: 'Protects an area from intruders', running: false },
    { title: 'Resource Collector', description: 'Collects nearby resources', running: true }
  ];
  
  addBot() {
    console.log('Add bot clicked');
  }

  toggleBot(bot: any) {
    bot.active = !bot.active;
  }

}
