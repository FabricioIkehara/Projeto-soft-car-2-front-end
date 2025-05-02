import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(email: string, senha: string): boolean {

    if (email === 'admin' && senha === 'admin') {

      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}

