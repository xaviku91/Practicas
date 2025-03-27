<?php
// UserController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /** ------ INDEX ------ */
    /**
     * Obtiene todos los usuarios.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Obtener todos los usuarios
        $users = User::all(['id', 'name', 'email', 'password', 'created_at', 'updated_at']); // Seleccionamos los campos que queremos devolver

        return response()->json($users); // Devolver los usuarios en formato JSON
    }

    /** ------ SHOW ------ */
    /**
     * Muestra un usuario específico por su ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Buscar el usuario por su ID
        $user = User::find($id);

        // Verificar si el usuario existe
        if ($user) {
            return response()->json($user); // Devolver el usuario en formato JSON
        } else {
            // Si no se encuentra el usuario, devolver un mensaje de error 404
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }
    }

    /** ------ DESTROY ------ */
    /**
     * Elimina un usuario de la base de datos.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Buscar el usuario por su ID
        $user = User::find($id);

        // Verificar si el usuario existe
        if ($user) {
            // Eliminar el usuario
            $user->delete();

            // Devolver un mensaje de éxito
            return response()->json(['message' => 'Usuario eliminado correctamente.'], 200);
        } else {
            // Si no se encuentra el usuario, devolver un mensaje de error 404
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }
    }
}
