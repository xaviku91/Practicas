import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),    // Activar coalescción de eventos para optimizar el rendimiento
    provideRouter(routes),                                    // Configuración de rutas
    provideHttpClient()                                       // Configuración del HTTP client
  ]
};
