import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model'; // Importe a interface Order

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class SmallCardComponent {
  @Input() order!: Order;
  @Input() titulo: string | undefined;
  @Output() cardClicked: EventEmitter<Order> = new EventEmitter<Order>();

  onCardClick() {
    this.cardClicked.emit(this.order);
    console.log('Card clicado', this.order);
  }
}