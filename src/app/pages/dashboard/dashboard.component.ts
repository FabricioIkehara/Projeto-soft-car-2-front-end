// dashboard.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SmallCardComponent } from '../../components/small-card/small-card.component';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { MenuSideComponent } from '../../components/menu-side/menu-side.component';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [SmallCardComponent, MenuBarComponent, MenuSideComponent, HttpClientModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit {
  allOrders: any[] = [];
  orders: any[] = [];
  private readonly apiUrl: string = 'http://127.0.0.1:8000/orders/';
  servicosValidos: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAllOrders();
  }

  loadAllOrders() {
    this.http.get<Order[]>(this.apiUrl).subscribe(
      (data) => {
        this.allOrders = data.sort((a, b) => b.id - a.id); // Ordena pelo ID de forma decrescente
        this.totalPages = Math.ceil(this.allOrders.length / this.itemsPerPage);
        this.loadCurrentPageOrders();
      },
      (error) => {
        console.error('Erro ao carregar os pedidos:', error);
      }
    );
  }

  loadCurrentPageOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.orders = this.allOrders.slice(startIndex, endIndex);

    if (this.orders.length > 0) {
      this.servicosValidos = this.orders[0].servicosValidos;
    } else {
      this.servicosValidos = '';
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCurrentPageOrders();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCurrentPageOrders();
    }
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}