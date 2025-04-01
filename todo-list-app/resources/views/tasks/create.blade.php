@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Crear Tarea</h1>
        <form action="{{ route('tasks.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label>Título</label>
                <input type="text" name="title" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description" class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
            <a href="{{ route('tasks.index') }}" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
@endsection
