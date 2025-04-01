<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckBlockedUser
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            dd('Middleware ejecutado, blocked = ' . Auth::user()->blocked);
        }
        if (Auth::check() && Auth::user()->blocked) {
            Auth::logout();
            return redirect('/login')->with('error', 'Has sido bloqueado por un administrador.');
        }
        return $next($request);
    }
}
