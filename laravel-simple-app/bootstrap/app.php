<?php

// Importamos las clases necesarias del framework Laravel
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

// Configuramos y devolvemos una nueva instancia de la aplicación Laravel
return Application::configure(basePath: dirname(__DIR__)) // Define la ruta base del proyecto
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',      // Define el archivo donde se configuran las rutas web
        commands: __DIR__ . '/../routes/console.php', // Define las rutas para comandos de consola (artisan)
        health: '/up',                            // Ruta que permite verificar el estado de la aplicación
    )
    ->withRouting(function () {
        // Agrupamos las rutas de la API con un prefijo "api" y aplicamos el middleware correspondiente
        Route::middleware('api') // Middleware que gestiona aspectos como la autenticación y seguridad
            ->prefix('api')      // Todas las rutas dentro de este grupo estarán bajo el prefijo "api"
            ->group(base_path('routes/api.php')); // Carga las rutas definidas en el archivo api.php
    })
    ->withMiddleware(function (Middleware $middleware) {
        // Aquí se pueden registrar middlewares personalizados para modificar el comportamiento de la aplicación
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Aquí se pueden configurar manejadores de excepciones personalizados
    })->create(); // Crea y devuelve la instancia de la aplicación configurada
