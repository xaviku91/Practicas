<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Task;

Route::get('/', function () {
    // Obtener todas las tareas
    $tasks = Task::all();

    $name = 'Xavi';


    return view('todo', ['tasks' => $tasks, 'name' => $name]);
});

Route::post('/add-task', function (Request $request) {
    $newTask = new Task();
    $newTask->title = $request->input('task');
    $newTask->save();
    return redirect('/');
});

Route::delete('/delete-task/{id}', function ($id) {
    $task = Task::findOrFail($id);
    $task->delete();
    return redirect('/');
});

Route::put('/update-task/{id}', function (Request $request, $id) {
    $task = Task::findOrFail($id);
    $task->title = $request->input('title');
    $task->save();
    return redirect('/');
});
