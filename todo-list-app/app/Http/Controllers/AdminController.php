<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(function ($request, $next) {
            if (Auth::user()->role !== 'admin') {
                abort(403, 'No tienes permiso para acceder a esta página.');
            }
            return $next($request);
        });
    }

    public function index()
    {
        $users = User::all(); // Obtener todos los usuarios
        return view('admin.index', compact('users')); // Pasar los usuarios a la vista
    }

    public function edit(User $user)
    {
        return view('admin.edit', compact('user')); // Vista para editar un usuario
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:user,admin', // Asegura que el rol sea 'user' o 'admin'
        ]);

        $user->update($request->only('name', 'email', 'role'));
        return redirect()->route('admin.index')->with('success', 'Usuario actualizado correctamente.');
    }

    public function destroy(User $user)
    {
        if ($user->id === Auth::user()->id) {
            return redirect()->route('admin.index')->with('error', 'No puedes eliminar tu propia cuenta.');
        }
        $user->delete();
        return redirect()->route('admin.index')->with('success', 'Usuario eliminado correctamente.');
    }

    public function toggleBlock(User $user)
    {
        if ($user->id === Auth::user()->id) {
            return redirect()->route('admin.index')->with('error', 'No puedes bloquear tu propia cuenta.');
        }
        $user->update(['blocked' => !$user->blocked]);
        $message = $user->blocked ? 'Usuario bloqueado correctamente.' : 'Usuario desbloqueado correctamente.';
        return redirect()->route('admin.index')->with('success', $message);
    }


    public function create()
    {
        return view('admin.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:user,admin',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('admin.index')->with('success', 'Usuario creado correctamente.');
    }

    public function show(User $user)
    {
        return view('admin.show', compact('user'));
    }
}
