<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;

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

// Ruta protegida para obtener el usuario autenticado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas de usuarios protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);        // Ver todos los usuarios
    Route::get('/users/{id}', [UserController::class, 'show']);    // Ver un usuario específico
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Eliminar un usuario
    Route::put('/users/{id}', [UserController::class, 'update']); // Actualizar un usuario
    Route::post('/users/{id}/role', [UserController::class, 'updateRole']); // Actualizar rol de un usuario
    Route::post('/logout', [AuthController::class, 'logout']); // Cerrar sesión
});
