@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Detalles del Usuario: {{ $user->name }}</h1>
        <div class="card">
            <div class="card-body">
                <p><strong>ID:</strong> {{ $user->id }}</p>
                <p><strong>Nombre:</strong> {{ $user->name }}</p>
                <p><strong>Email:</strong> {{ $user->email }}</p>
                <p><strong>Rol:</strong> {{ $user->role ?? 'Sin rol' }}</p>
                <p><strong>Estado:</strong> {{ $user->blocked ? 'Bloqueado' : 'Activo' }}</p>
                <p><strong>Fecha de Creación:</strong> {{ $user->created_at }}</p>
            </div>
        </div>
        <a href="{{ route('admin.index') }}" class="btn btn-secondary mt-3">Volver</a>
    </div>
@endsection
