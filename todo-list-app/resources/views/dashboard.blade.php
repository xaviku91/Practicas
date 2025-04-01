@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Mi Espacio</h1>
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Bienvenido, {{ $user->name }}</h5>
                <p class="card-text">
                    <strong>Nombre:</strong> {{ $user->name }}<br>
                    <strong>Email:</strong> {{ $user->email }}<br>
                    <strong>Rol:</strong> {{ $user->role ?? 'Usuario' }}
                </p>
                <a href="{{ route('dashboard.edit') }}" class="btn btn-primary">Editar mis datos</a>
            </div>
        </div>
    </div>
@endsection
