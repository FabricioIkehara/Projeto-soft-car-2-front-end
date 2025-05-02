import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule ],
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService) {}

  login() {
    const isAuthenticated = this.authService.login(this.email, this.senha);
    if (!isAuthenticated) {
      alert('Credenciais inválidas!');
    }
  }
}
