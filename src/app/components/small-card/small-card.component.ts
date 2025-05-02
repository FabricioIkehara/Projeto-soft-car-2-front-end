import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Order {
servicos: any;
  id: number;
  client: string;
  telefone: string;
  carro: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class SmallCardComponent {
  @Input() order!: Order;
  @Input() titulo: string | undefined;
servico: any;
}
