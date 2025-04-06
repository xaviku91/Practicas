import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuario: any = {};
  editMode = false;
  error = '';
  loading = false;
  passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
  passwordError = '';
  fotoFile: File | null = null;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return;
    }
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.loading = true;
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    this.apiService.get<any>('me', { headers }).subscribe({
      next: (response) => {
        this.usuario = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el perfil';
        this.loading = false;
        console.error(err);
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.error = '';
  }

  guardarCambios(): void {
    if (!this.validarDatos()) {
      this.error = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    const body = {
      nombre: this.usuario.nombre,
      apellidos: this.usuario.apellidos || '',
      telefono: this.usuario.telefono || '',
      direccion: this.usuario.direccion || ''
    };

    this.apiService.put<any>(`users/${this.usuario.id}`, body, { headers }).subscribe({
      next: () => {
        if (this.fotoFile) {
          this.subirFoto();
        } else {
          this.editMode = false;
          this.cargarPerfil();
          alert('Perfil actualizado con éxito');
        }
      },
      error: (err) => {
        this.error = 'Error al actualizar el perfil';
        console.error(err);
      }
    });
  }

  subirFoto(): void {
    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    const formData = new FormData();
    formData.append('fotoFile', this.fotoFile!);

    this.apiService.put<any>(`users/${this.usuario.id}`, formData, { headers }).subscribe({
      next: () => {
        this.editMode = false;
        this.fotoFile = null;
        this.cargarPerfil();
        alert('Perfil y foto actualizados con éxito');
      },
      error: (err) => {
        this.error = 'Error al subir la foto';
        console.error(err);
      }
    });
  }

  cambiarContrasena(): void {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.passwordError = 'Las contraseñas no coinciden';
      return;
    }
    if (!this.passwordData.currentPassword || !this.passwordData.newPassword) {
      this.passwordError = 'Por favor, completa todos los campos';
      return;
    }

    const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
    const body = {
      currentPassword: this.passwordData.currentPassword,
      newPassword: this.passwordData.newPassword
    };

    this.apiService.post<any>('users/change-password', body, { headers }).subscribe({
      next: () => {
        this.passwordError = '';
        this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
        alert('Contraseña cambiada con éxito');
      },
      error: (err) => {
        this.passwordError = err.error?.error || 'Error al cambiar la contraseña';
        console.error(err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.fotoFile = input.files[0];
    }
  }

  private validarDatos(): boolean {
    return !!this.usuario.nombre && !!this.usuario.email;
  }
}
