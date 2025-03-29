<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>To-Do List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            color: #333;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            background: #f9f9f9;
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        form {
            margin-bottom: 20px;
        }

        input[type="text"] {
            padding: 5px;
            width: 70%;
        }

        button {
            padding: 5px 10px;
        }

        .delete-btn {
            background-color: #ff4444;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        .delete-btn:hover {
            background-color: #cc0000;
        }
    </style>
</head>

<body>
    <h1>Mi Lista de Tareas</h1>
    <p>Bienvenido, {{ $name }}</p>

    <form method="POST" action="/add-task">
        @csrf
        <input type="text" name="task" placeholder="Nueva tarea" required>
        <button type="submit">Agregar</button>
    </form>

    <ul>
        @foreach ($tasks as $task)
            <li>
                {{ $task->title }}
                <form method="POST" action="/delete-task/{{ $task->id }}">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="delete-btn">Eliminar</button>
                </form>
            </li>
        @endforeach
    </ul>
    <ul>
        @foreach ($tasks as $task)
            <li>
                <form method="POST" action="/update-task/{{ $task->id }}"
                    style="display: flex; align-items: center; flex-grow: 1;">
                    @csrf
                    @method('PUT')
                    <input type="text" name="title" value="{{ $task->title }}"
                        style="flex-grow: 1; margin-right: 10px;">
                    <button type="submit">Actualizar</button>
                </form>
                <form method="POST" action="/delete-task/{{ $task->id }}">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="delete-btn">Eliminar</button>
                </form>
            </li>
        @endforeach
    </ul>
</body>

</html>
