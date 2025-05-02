import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClientsCardComponent } from '../../components/clients-card/clients-card.component';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { MenuSideComponent } from '../../components/menu-side/menu-side.component';
import { CommonModule } from '@angular/common';

interface Client {
  id: number;
  client: string;
  telefone: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [MenuBarComponent, MenuSideComponent, ClientsCardComponent, CommonModule, HttpClientModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  private readonly apiUrl: string = 'http://127.0.0.1:8000/clients/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.http.get<Client[]>(this.apiUrl).subscribe({
      next: (data) => this.handleClientData(data),
      error: (error) => this.handleError(error),
    });
  }

  private handleClientData(data: Client[]): void {
    this.clients = data;
    console.log('Clientes carregados:', this.clients);
  }

  private handleError(error: any): void {
    console.error('Erro ao carregar clientes:', error);
  }
}
