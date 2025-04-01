<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return redirect('/login')->with('error', 'No estás autenticado.');
        }
        return view('dashboard', compact('user'));
    }

    public function edit()
    {
        $user = Auth::user();
        if (!$user) {
            return redirect('/login')->with('error', 'No estás autenticado.');
        }
        return view('dashboard_edit', compact('user'));
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return redirect('/login')->with('error', 'No estás autenticado.');
        }

        // Depuración temporal para verificar $user
        // dd($user);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $data = $request->only('name', 'email');
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);
        return redirect()->route('dashboard')->with('success', 'Datos actualizados correctamente.');
    }
}
