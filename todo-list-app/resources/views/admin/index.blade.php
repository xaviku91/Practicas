@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Panel de Administración - Gestión de Usuarios</h1>

        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @if (session('error'))
            <div class="alert alert-danger">{{ session('error') }}</div>
        @endif

        <a href="{{ route('admin.create') }}" class="btn btn-primary mb-3">Crear Nuevo Usuario</a>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                    <tr>
                        <td>{{ $user->id }}</td>
                        <td>{{ $user->name }}</td>
                        <td>{{ $user->email }}</td>
                        <td>{{ $user->role ?? 'Sin rol' }}</td>
                        <td>{{ $user->blocked ? 'Bloqueado' : 'Activo' }}</td>
                        <td>
                            <a href="{{ route('admin.show', $user) }}" class="btn btn-sm btn-info">Ver</a>
                            <a href="{{ route('admin.edit', $user) }}" class="btn btn-sm btn-warning">Editar</a>
                            <form action="{{ route('admin.destroy', $user) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger"
                                    onclick="return confirm('¿Estás seguro de eliminar a {{ $user->name }}?')">Eliminar</button>
                            </form>
                            <form action="{{ route('admin.toggle-block', $user) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('PUT')
                                <button type="submit"
                                    class="btn btn-sm {{ $user->blocked ? 'btn-success' : 'btn-danger' }}"
                                    onclick="return confirm('¿Estás seguro de {{ $user->blocked ? 'desbloquear' : 'bloquear' }} a {{ $user->name }}?')">
                                    {{ $user->blocked ? 'Desbloquear' : 'Bloquear' }}
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
