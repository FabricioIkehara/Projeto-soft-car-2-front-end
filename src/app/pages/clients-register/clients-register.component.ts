import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddClientModalComponent } from '../../components/add-client-modal/add-client-modal.component';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { MenuSideComponent } from '../../components/menu-side/menu-side.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients-register',
  templateUrl: './clients-register.component.html',
  styleUrls: ['./clients-register.component.css'],
  standalone: true,
  imports: [
    MenuSideComponent,
    MenuBarComponent,
    AddClientModalComponent,
    CommonModule,
    FormsModule
  ],
})
export class ClientsRegisterComponent {
  constructor(private dialog: MatDialog) {}

  openAddClientModal(form: NgForm): void {
    if (form.valid) {
      const clientData = {
        client: form.value.client, // Este é o nome que você usa na sua interface
        telefone: form.value.telefone,
        carro: form.value.carro,
        cor: form.value.cor,
        placa: form.value.placa,
        observacao: form.value.observacao,
      };

      const dialogRef = this.dialog.open(AddClientModalComponent, {
        width: '400px',
        data: clientData, // Passando os dados do cliente para o modal
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.confirmed) {
          console.log('Cliente adicionado com sucesso:', result.data);
        }
      });
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm();
  }
}
