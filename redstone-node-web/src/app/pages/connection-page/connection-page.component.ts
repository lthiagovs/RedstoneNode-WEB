import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Connection {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'pending';
  lastSync: string;
  icon: string;
}

@Component({
  selector: 'app-connection-page',
  imports: [FormsModule],
  templateUrl: './connection-page.component.html',
  styleUrl: './connection-page.component.css'
})
export class ConnectionPageComponent {

  searchQuery = '';
  showModal = false;
  
  connections: Connection[] = [
    {
      id: 1,
      name: 'Production Database',
      type: 'PostgreSQL Database',
      status: 'active',
      lastSync: '5 minutes ago',
      icon: 'storage'
    },
    {
      id: 2,
      name: 'API Gateway',
      type: 'REST API',
      status: 'active',
      lastSync: '1 hour ago',
      icon: 'api'
    },
    {
      id: 3,
      name: 'Backup Storage',
      type: 'Cloud Storage',
      status: 'inactive',
      lastSync: '1 day ago',
      icon: 'cloud'
    },
    {
      id: 4,
      name: 'Message Queue',
      type: 'RabbitMQ',
      status: 'pending',
      lastSync: '30 minutes ago',
      icon: 'queue'
    }
  ];

  openCreateModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
