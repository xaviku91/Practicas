@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Editar Usuario: {{ $user->name }}</h1>

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('admin.update', $user) }}" method="POST">
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
                <label for="role">Rol</label>
                <select name="role" id="role" class="form-control" required>
                    <option value="user" {{ $user->role === 'user' ? 'selected' : '' }}>Usuario</option>
                    <option value="admin" {{ $user->role === 'admin' ? 'selected' : '' }}>Administrador</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Actualizar</button>
            <a href="{{ route('admin.index') }}" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
@endsection
