import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.component.html',
  styleUrls: ['./add-client-modal.component.scss'],
  imports: [HttpClientModule],
  standalone: true,
})
export class AddClientModalComponent {

  private apiUrl = 'http://127.0.0.1:8000/submit-form/';

  constructor(
    public dialogRef: MatDialogRef<AddClientModalComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any // Injetando os dados corretamente
  ) {}

  confirm(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const orderData = {
      client: this.data.client, // Agora data deve estar definido
      telefone: this.data.telefone,
      carro: this.data.carro,
      cor: this.data.cor,
      placa: this.data.placa,
      observacao: this.data.observacao,
      email: this.data.email,
      servicos: this.data.servicos,
      valorTotal: this.data.valorTotal,
    };

    console.log('Dados enviados:', orderData);

    this.http.post(this.apiUrl, orderData, { headers }).subscribe(
      (response) => {
        console.log('Pedido adicionado com sucesso!', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Erro ao salvar cliente:', error);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close({ confirmed: false });
  }
}
