<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;            // Para recibir datos de la petición
use App\Models\User;                    // Para interactuar con la tabla "users"
use Illuminate\Support\Facades\Hash;    // Para verificar contraseñas

class AuthController extends Controller
{
    /**
     * Registra un nuevo usuario.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validar los datos enviados por el usuario
        $data = $request->validate([
            'name' => 'required|string|max:255',                        // Nombre obligatorio, texto, máximo 255 caracteres
            'email' => 'required|string|email|max:255|unique:users',    // Email obligatorio, único en "users"
            'password' => 'required|string|min:8',                      // Contraseña obligatoria, mínimo 8 caracteres
        ]);

        // Crear el usuario en la base de datos
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'], // Laravel lo encripta automáticamente por "casts"
        ]);

        // Devolver una respuesta en JSON
        return response()->json([
            'message' => 'Usuario registrado con éxito',
            'user' => $user
        ]);
    }

    /**
     * Inicia sesión para un usuario existente.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Validar los datos enviados por el usuario
        $data = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Buscar el usuario en la base de datos por el email
        $user = User::where('email', $data['email'])->first();

        // Verificar si el usuario existe y la contraseña es correcta
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        // Generar un token con Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Devolver una respuesta en JSON con el token de acceso
        return response()->json([
            'message' => 'Login exitoso',
            'token' => $token
        ]);
    }
}
