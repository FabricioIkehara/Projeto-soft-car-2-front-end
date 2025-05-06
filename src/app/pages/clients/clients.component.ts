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
  paginatedClients: Client[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
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
    this.clients = data.sort((a, b) => a.client.localeCompare(b.client)); // ordena
    this.totalPages = Math.ceil(this.clients.length / this.itemsPerPage);
    this.updatePaginatedClients();
  }

  private updatePaginatedClients(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedClients = this.clients.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedClients();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedClients();
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  private handleError(error: any): void {
    console.error('Erro ao carregar clientes:', error);
  }
}
