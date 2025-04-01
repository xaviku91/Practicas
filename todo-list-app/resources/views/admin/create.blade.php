@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Crear Nuevo Usuario</h1>

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('admin.store') }}" method="POST">
            @csrf

            <div class="form-group mb-3">
                <label for="name">Nombre</label>
                <input type="text" name="name" id="name" class="form-control" value="{{ old('name') }}" required>
            </div>

            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" value="{{ old('email') }}"
                    required>
            </div>

            <div class="form-group mb-3">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" class="form-control" required>
            </div>

            <div class="form-group mb-3">
                <label for="password_confirmation">Confirmar Contraseña</label>
                <input type="password" name="password_confirmation" id="password_confirmation" class="form-control"
                    required>
            </div>

            <div class="form-group mb-3">
                <label for="role">Rol</label>
                <select name="role" id="role" class="form-control" required>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Crear</button>
            <a href="{{ route('admin.index') }}" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
@endsection
