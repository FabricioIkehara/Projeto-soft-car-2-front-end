import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductModalComponent } from '../../components/add-product-modal/add-product-modal.component';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { MenuSideComponent } from '../../components/menu-side/menu-side.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-register',
  standalone: true,
  imports: [MenuBarComponent, MenuSideComponent, FormsModule, CommonModule],
  templateUrl: './order-register.component.html',
  styleUrls: ['./order-register.component.css'],
})
export class OrderRegisterComponent {
  formData = {
    client: '',
    telefone: '',
    carro: '',
    cor: '',
    placa: '',
    observacoes: '',
    email: '',
  };

  responseMessage = '';

  i: number | undefined;
  currencyPipe: any;

  constructor(private dialog: MatDialog) {}


  public servicos: Array<{ quantidade: number, descricao: string, total: number }> = [];


  public adicionarServico(): void {
    this.servicos.push({ quantidade: 0, descricao: '', total: 0 });
  }

  public limparTabela(): void {
    this.servicos = [];
    console.log('Tabela de serviços limpa.');
  }

  public onSubmit(): void {

    console.log(this.formData);
    console.log(this.servicos);
    this.openDialog();
  }

  openDialog(): void {
    // Filtrar serviços válidos (não nulos)
    const servicosValidos = this.servicos.filter(
      (servico) => servico.descricao && servico.quantidade && servico.total
    );


    const valorTotal = servicosValidos.reduce(
      (acc, servico) => acc + (servico.quantidade * servico.total),
      0
    );

    const dialogRef = this.dialog.open(AddProductModalComponent, {
      panelClass: 'custom-dialog',
      data: {
        client: this.formData.client,
        telefone: this.formData.telefone,
        carro: this.formData.carro,
        cor: this.formData.cor,
        placa: this.formData.placa,
        email: this.formData.email,
        observacao: this.formData.observacoes,
        servicos: servicosValidos,
        valorTotal: valorTotal
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.responseMessage = 'Serviço adicionado com sucesso!';
        console.log('Serviço adicionado:', result);
      } else {
        console.log('Adição de serviço cancelada.');
      }
    });
  }


  formatarValorMonetario(index: number): void {
    const valorAtual = this.servicos[index].total.toString().replace(/\D/g, '');
    const valorFormatado = (parseFloat(valorAtual) / 100).toFixed(2);

    this.servicos[index].total = this.currencyPipe.transform(valorFormatado, 'BRL', 'symbol', '1.2-2') || 'R$ 0,00';
  }

}
