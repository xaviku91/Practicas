<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Rutas de la API
|--------------------------------------------------------------------------
|
| Estas rutas usarán el prefijo "/api" y el middleware "api".
|
*/

// Rutas de autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas de usuarios
// api.php

// Rutas de autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Rutas de usuarios
Route::get('/users', [UserController::class, 'index']);             // Ver todos los usuarios
Route::get('/users/{id}', [UserController::class, 'show']);             // Ver un usuario específico
Route::delete('/users/{id}', [UserController::class, 'destroy']);       // Eliminar un usuario
