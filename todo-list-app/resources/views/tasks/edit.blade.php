@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Editar Tarea</h1>
        <form action="{{ route('tasks.update', $task) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label>Título</label>
                <input type="text" name="title" class="form-control" value="{{ $task->title }}" required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description" class="form-control">{{ $task->description }}</textarea>
            </div>
            <div class="form-group">
                <label>Estado</label>
                <select name="completed" class="form-control">
                    <option value="0" {{ !$task->completed ? 'selected' : '' }}>Pendiente</option>
                    <option value="1" {{ $task->completed ? 'selected' : '' }}>Completada</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Actualizar</button>
            <a href="{{ route('tasks.index') }}" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
@endsection
