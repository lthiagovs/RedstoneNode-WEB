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
  targetBot:Bot | null = null;

  searchQuery = '';
  bots:Bot[] = [];

  scripts = [
    { title: 'Parar Tudo', description: 'O Bot para todas as suas ações.', action: "http://localhost:3000/actions/stopAll/"},
    { title: 'Coletar Madeira', description: 'Procura e coleta todo tipo de madeira.', action: "http://localhost:3000/actions/getWood/"},
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

  handleBotStatus(id:number, event:any){
    const isChecked = event.target.checked;
    if(isChecked){
      this.online(id);
    }else{
      this.offline(id);
    }
  }

  async executeAction(script: any){
    await this.http.put(script.action+this.targetBot?.id,null).subscribe((response) => {});
  }

  handleBot(bot:Bot){
    this.targetBot = bot;
  }

  //Bot Commands
  async online(id:number){
    await this.http.put("http://localhost:3000/bot/online/"+id,null).subscribe((response) => {});
  }

  async offline(id:number){
    await this.http.put("http://localhost:3000/bot/offline/"+id,null).subscribe((response) => {});
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
