import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SmallCardComponent } from '../../components/small-card/small-card.component';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { MenuSideComponent } from '../../components/menu-side/menu-side.component';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { MatDialog, MatDialogModule, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { OrderDetailsModalComponent } from '../../components/order-details-modal/order-details-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    SmallCardComponent,
    MenuBarComponent,
    MenuSideComponent,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    OrderDetailsModalComponent,
  ],
})
export class DashboardComponent implements OnInit {
  allOrders: Order[] = [];
  orders: Order[] = [];
  private readonly apiUrl: string = 'http://127.0.0.1:8000/orders/';
  servicosValidos: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  private currentDialogRef: MatDialogRef<OrderDetailsModalComponent> | null = null;
  private currentOrderId: number | null = null;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadAllOrders();
  }

  loadAllOrders() {
    this.http.get<Order[]>(this.apiUrl).subscribe(
      (data) => {
        this.allOrders = data.sort((a, b) => b.id - a.id);
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
      this.servicosValidos = this.orders[0].servicos?.[0] || '';
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

  openOrderDetailsModal(order: Order) {
    // Evita abrir o mesmo modal para o mesmo pedido
    if (this.currentOrderId === order.id) {
      return;
    }

    // Fecha todos os modais abertos e limpa o estado
    this.dialog.closeAll();
    this.currentDialogRef = null;
    this.currentOrderId = null;

    // Adiciona classe para bloquear interações na página de fundo
    document.body.classList.add('modal-open');

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = { order };
    dialogConfig.width = '900px';
    dialogConfig.height = '400px';
    dialogConfig.panelClass = 'custom-order-dialog-panel';
    dialogConfig.backdropClass = 'custom-order-backdrop';

    // Abre o novo modal
    this.currentDialogRef = this.dialog.open(OrderDetailsModalComponent, dialogConfig);
    this.currentOrderId = order.id;

    this.currentDialogRef.afterClosed().subscribe(result => {
      // Limpa o estado e remove a classe de bloqueio
      this.currentDialogRef = null;
      this.currentOrderId = null;
      document.body.classList.remove('modal-open');

      if (result) {
        console.log('Modal fechado com resultado:', result);
        if (result.emailEnviado) {
          this.loadAllOrders();
        }
      }
    });
  }
}