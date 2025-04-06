import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  contacto = { nombre: '', email: '', mensaje: '' };
  enviado = false;
  error = '';

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    if (!this.contacto.nombre || !this.contacto.email || !this.contacto.mensaje) {
      this.error = 'Completa todos los campos';
      return;
    }
    this.apiService.post('contacto', this.contacto).subscribe({
      next: () => {
        this.enviado = true;
        this.error = '';
      },
      error: (err) => {
        this.error = 'Error al enviar el mensaje';
        console.error(err);
      }
    });
  }

  resetForm(): void {
    this.contacto = { nombre: '', email: '', mensaje: '' };
    this.enviado = false;
  }
}
