import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Connection } from '../../models/connection.model';
import { Bot } from '../../models/bot.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-command-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './command-page.component.html',
  styleUrl: './command-page.component.css'
})
export class CommandPageComponent {

  constructor(private http:HttpClient) {}

  @Input({required: true})
  targetConnection?:Connection;

  searchQuery = '';
  bots:Bot[] = [];

  scripts = [
    { title: 'Auto Farm', description: 'Farms resources automatically', running: true },
    { title: 'Guard Duty', description: 'Protects an area from intruders', running: false },
    { title: 'Resource Collector', description: 'Collects nearby resources', running: true },
    { title: 'Guard Duty', description: 'Protects an area from intruders', running: false },
    { title: 'Guard Duty', description: 'Protects an area from intruders', running: false },
    { title: 'Guard Duty', description: 'Protects an area from intruders', running: false },
    { title: 'Guard Duty', description: 'Protects an area from intruders', running: false },
    { title: 'Guard Duty', description: 'Protects an area from intruders', running: false },
  ];

  async ngOnInit(){

    await this.getAllBots();

  }

  async getAllBots(){
    if(this.targetConnection){
      await this.http.get("http://localhost:3000/bot/getByConnectionID/"+this.targetConnection.id).subscribe((response) => {
        this.bots = [];
        this.bots = response as Bot[];
      });
    }
  }

  toggleBot(bot: any) {
    bot.active = !bot.active;
  }

  selectScript(script: any) {
    script.selected = true;
  }

  //Bot Commands
  async online(id:number){
    await this.http.get("http://localhost:3000/bot/online/"+id).subscribe((response) => {
      this.bots = response as Bot[];
    });
  }

  async addBot() {

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    const username = `bot${hours}${minutes}${seconds}${milliseconds}`;
    
    const bot = {
      username: username,
      connectionID: this.targetConnection?.id

    }

    await this.http.post("http://localhost:3000/bot/create",bot).subscribe((response) => {
      this.bots.push(response as Bot);
    });
    
  }

}
