<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;            // Para recibir datos de la petición
use App\Models\User;                    // Para interactuar con la tabla "users"
use Illuminate\Support\Facades\Hash;    // Para verificar contraseñas
use Illuminate\Support\Facades\Response;


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
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string', // Quitamos min:8 temporalmente
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return response()->json([
            'message' => 'Usuario registrado con éxito',
            'user' => $user
        ]);
    }

    /** ------ lOGIN ------ */
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
