@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Editar Mis Datos</h1>

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('dashboard.update') }}" method="POST">
            @csrf
            @method('PUT')

            <div class="form-group mb-3">
                <label for="name">Nombre</label>
                <input type="text" name="name" id="name" class="form-control" value="{{ old('name', $user->name) }}"
                    required>
            </div>

            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control"
                    value="{{ old('email', $user->email) }}" required>
            </div>

            <div class="form-group mb-3">
                <label for="password">Nueva Contraseña (opcional)</label>
                <input type="password" name="password" id="password" class="form-control"
                    placeholder="Dejar en blanco para no cambiar">
            </div>

            <div class="form-group mb-3">
                <label for="password_confirmation">Confirmar Nueva Contraseña</label>
                <input type="password" name="password_confirmation" id="password_confirmation" class="form-control">
            </div>

            <button type="submit" class="btn btn-primary">Actualizar</button>
            <a href="{{ route('dashboard') }}" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
@endsection
