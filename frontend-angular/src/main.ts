// src/main.ts
import { provideHttpClient } from '@angular/common/http'; // Para HttpClient
import { bootstrapApplication } from '@angular/platform-browser'; // Para bootstrapApplication
import { provideRouter } from '@angular/router'; // Para provideRouter
import { AppComponent } from './app/app.component'; // Componente principal
import { routes } from './app/app.routes'; // Rutas

// Iniciar la aplicación
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),    // Necesario para RouterOutlet
    provideHttpClient(),      // Necesario para AuthService
  ],
}).catch((err) => console.error(err)); // Capturar errores