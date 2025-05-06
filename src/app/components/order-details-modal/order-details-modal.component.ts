import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Order } from '../../models/order.model';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.css'],
  standalone: true,
  imports: [MatDialogModule, HttpClientModule, CommonModule],
})
export class OrderDetailsModalComponent implements OnInit, OnDestroy {
  order: Order;
  emailEnviado: boolean = false;
  enviando: boolean = false;
  erroEnvio: string = '';
  private destroy$ = new Subject<void>();
  private brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';
  private brevoApiKey = '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';

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.order = data.order;
  }

  ngOnInit(): void {
    this.emailEnviado = false;
    this.erroEnvio = '';
    console.log('Order:', this.order);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  enviarEmail(): void {
    if (!this.order || !this.order.email) {
      this.erroEnvio = 'E-mail do cliente não encontrado.';
      return;
    }

    this.enviando = true;
    this.emailEnviado = false;
    this.erroEnvio = '';

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'api-key': this.brevoApiKey,
      'content-type': 'application/json',
    });

    const payload = {
      sender: { name: 'SoftCar', email: 'softcar.projeto@gmail.com' }, 
      to: [{ email: this.order.email }],
      subject: 'Seu pedido está pronto!',
      htmlContent: `<h3>Olá, ${this.order.client}!</h3><p>Seu pedido #${this.order.id} está pronto para retirada!</p>`,
    };

    this.http
      .post(this.brevoApiUrl, payload, { headers })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          console.log('E-mail enviado com sucesso:', response);
          this.emailEnviado = true;
          this.enviando = false;
          this.dialogRef.close({ emailEnviado: true, orderId: this.order.id });
        },
        (error: HttpErrorResponse) => {
          console.error('Erro ao enviar e-mail:', error);
          this.enviando = false;
          this.erroEnvio = error.error?.message || 'Erro ao enviar o e-mail. Tente novamente.';
        }
      );
  }
}