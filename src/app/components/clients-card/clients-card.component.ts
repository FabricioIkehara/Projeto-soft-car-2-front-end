import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Client {
  id: number;
  client: string;
  telefone: string;

}

@Component({
  selector: 'app-clients-card',
  standalone: true,
  templateUrl: './clients-card.component.html',
  styleUrls: ['./clients-card.component.css'],
  imports: [CommonModule],
})
export class ClientsCardComponent {
  @Input() client!: Client;
}
