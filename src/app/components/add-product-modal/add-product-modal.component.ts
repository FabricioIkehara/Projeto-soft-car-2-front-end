import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule]
})
export class AddProductModalComponent {
  private apiUrl = 'http://127.0.0.1:8000/submit-order/';

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const orderData = {
      client: this.data.client,
      telefone: this.data.telefone,
      carro: this.data.carro,
      cor: this.data.cor,
      placa: this.data.placa,
      observacao: this.data.observacao,
      email: this.data.email,
      servicos: this.data.servicos,
      valorTotal: this.data.valorTotal
    };

    console.log('Dados enviados:', orderData);

    this.http.post(this.apiUrl, orderData, { headers }).subscribe(
      (response) => {
        console.log('Pedido adicionado com sucesso!', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Erro ao adicionar pedido:', error);
        alert('Erro ao adicionar pedido. ' + (error.error?.message || ''));
      }
    );
  }
}
