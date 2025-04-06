import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

interface Carrito {
  id: number;
  estado: string;
  items: { id: number; cantidad: number; producto: any }[];
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito: Carrito | null = null;
  error = '';
  loading = false;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) this.cargarCarrito();
    else this.error = 'Inicia sesión para ver tu carrito';
  }

  cargarCarrito(): void {
    this.loading = true;
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    this.apiService.get<{ 'hydra:member': Carrito[] }>('carritos', { headers }).subscribe({
      next: (response) => {
        const carritos = response['hydra:member'];
        this.carrito = carritos.find(c => c.estado === 'pendiente') || null;
        if (!this.carrito) this.crearCarrito();
        else this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el carrito';
        this.loading = false;
        console.error(err);
      }
    });
  }

  crearCarrito(): void {
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    this.apiService.post<Carrito>('carritos/crear', {}, { headers }).subscribe({
      next: (response) => {
        this.carrito = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al crear el carrito';
        console.error(err);
      }
    });
  }

  actualizarCantidad(itemId: number, cantidad: number): void {
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    this.apiService.put<any>(`carrito_items/${itemId}`, { cantidad }, { headers }).subscribe({
      next: () => this.cargarCarrito(),
      error: (err) => {
        this.error = 'Error al actualizar';
        console.error(err);
      }
    });
  }

  eliminarItem(itemId: number): void {
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    this.apiService.delete<any>(`carrito_items/${itemId}`, { headers }).subscribe({
      next: () => this.cargarCarrito(),
      error: (err) => {
        this.error = 'Error al eliminar';
        console.error(err);
      }
    });
  }

  calcularTotal(): number {
    return this.carrito?.items.reduce((total, item) => total + (item.cantidad * item.producto.precioFinal), 0) || 0;
  }
}
