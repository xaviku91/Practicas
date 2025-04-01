<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = auth()->user()->tasks;
        return view('tasks.index', compact('tasks'));
    }

    // Resto del código sigue igual...
    public function create()
    {
        return view('tasks.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        auth()->user()->tasks()->create($request->only('title', 'description'));
        return redirect()->route('tasks.index')->with('success', 'Tarea creada.');
    }

    public function edit(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }
        return view('tasks.edit', compact('task'));
    }

    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task->update($request->only('title', 'description', 'completed'));
        return redirect()->route('tasks.index')->with('success', 'Tarea actualizada.');
    }

    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }
        $task->delete();
        return redirect()->route('tasks.index')->with('success', 'Tarea eliminada.');
    }
}
