import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Connection } from '../../models/connection.model';

@Component({
  selector: 'app-connection-page',
  imports: [FormsModule],
  templateUrl: './connection-page.component.html',
  styleUrl: './connection-page.component.css'
})
export class ConnectionPageComponent {

  constructor (private http:HttpClient) {}

  searchQuery = '';
  showModal = false;
  newConnectionHost:string = '';
  newConnectionPort:string = '';

  @Output()
  connectionEvent:EventEmitter<Connection> = new EventEmitter<Connection>();
  
  connections: Connection[] = [
  ];

  async ngOnInit(){
    await this.getAllConnections();
  }

  openCreateModal() {
    this.showModal = true;
  }
  
  async createConnection(){
    const newConnection = {
      host:this.newConnectionHost,
      port:this.newConnectionPort
    }

    await this.http.post("http://localhost:3000/connection/create", newConnection).subscribe((response) => {
      this.connections.push(response as Connection);
    });
    this.closeModal();
  }

  async getAllConnections(){
    await this.http.get("http://localhost:3000/connection/getAll").subscribe((response) => {
      this.connections = response as Connection[];
    });
  }

  openConnection(connection:Connection){
    this.connectionEvent.emit(connection);
  }

  closeModal() {
    this.showModal = false;
  }

}
