<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::middleware('auth')->group(function () {
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::resource('tasks', TaskController::class)->except(['show']);
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/edit', [DashboardController::class, 'edit'])->name('dashboard.edit');
    Route::put('/dashboard', [DashboardController::class, 'update'])->name('dashboard.update');
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/admin/{user}/edit', [AdminController::class, 'edit'])->name('admin.edit');
    Route::put('/admin/{user}', [AdminController::class, 'update'])->name('admin.update');
    Route::delete('/admin/{user}', [AdminController::class, 'destroy'])->name('admin.destroy');
    Route::put('/admin/{user}/toggle-block', [AdminController::class, 'toggleBlock'])->name('admin.toggle-block');
    Route::get('/admin/create', [AdminController::class, 'create'])->name('admin.create');
    Route::post('/admin', [AdminController::class, 'store'])->name('admin.store');
    Route::get('/admin/{user}', [AdminController::class, 'show'])->name('admin.show');
});
