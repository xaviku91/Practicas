@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Mis Tareas</h1>
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        <a href="{{ route('tasks.create') }}" class="btn btn-primary mb-3">Nueva Tarea</a>
        <table class="table">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($tasks as $task)
                    <tr>
                        <td>{{ $task->title }}</td>
                        <td>{{ $task->description }}</td>
                        <td>{{ $task->completed ? 'Completada' : 'Pendiente' }}</td>
                        <td>
                            <a href="{{ route('tasks.edit', $task) }}" class="btn btn-sm btn-warning">Editar</a>
                            <form action="{{ route('tasks.destroy', $task) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger"
                                    onclick="return confirm('¿Seguro?')">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
