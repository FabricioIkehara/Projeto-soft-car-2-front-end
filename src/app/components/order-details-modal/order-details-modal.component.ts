import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../../models/order.model';
import { Subject, takeUntil } from 'rxjs';
// Importe os módulos necessários para standalone
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.css'],
  standalone: true, // Declare o componente como standalone
  imports: [
    MatDialogModule,
    HttpClientModule,
    CommonModule, // Importe CommonModule para usar diretivas como *ngIf
  ], // Importe os módulos necessários
})
export class OrderDetailsModalComponent implements OnInit, OnDestroy {
  order: Order;
  emailEnviado: boolean = false;
  private destroy$ = new Subject<void>();
  apiUrl: string = 'http://seu-dominio.com.br/api';

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.order = data.order;
  }

  ngOnInit(): void {
    this.emailEnviado = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  enviarEmailConfirmacao(): void {
    if (this.order && this.order.id) {
      const apiUrl = `${this.apiUrl}/orders/${this.order.id}/enviar-email/`;

      this.http.post(apiUrl, {})
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (response: any) => {
            console.log('Email enviado com sucesso:', response);
            this.emailEnviado = true;
            this.dialogRef.close({ emailEnviado: true, orderId: this.order.id });
          },
          (error: HttpErrorResponse) => {
            console.error('Erro ao enviar email:', error);
            alert('Ocorreu um erro ao enviar o email. Por favor, tente novamente.');
          }
        );
    } else {
      console.error('ID do pedido inválido.');
      alert('ID do pedido inválido.');
    }
  }
}
