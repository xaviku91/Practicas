<?php

namespace App\Controller;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        JWTTokenManagerInterface $jwtManager,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Validar que se enviaron las credenciales
        if (!isset($data['_username']) || !isset($data['_password'])) {
            return $this->json(['error' => 'Faltan credenciales'], 400);
        }

        $email = $data['_username'];
        $plainPassword = $data['_password'];

        // Buscar al usuario por email
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            return $this->json(['error' => 'Credenciales inválidas'], 401);
        }

        // Verificar la contraseña
        if (!$passwordHasher->isPasswordValid($user, $plainPassword)) {
            return $this->json(['error' => 'Credenciales inválidas'], 401);
        }

        // Generar el token JWT
        $token = $jwtManager->create($user);

        return $this->json([
            'token' => $token,
            'user' => ['email' => $user->getEmail()]
        ]);
    }

    #[Route('/login', name: 'app_login')]
    public function loginWeb(): JsonResponse
    {
        return $this->json(['message' => 'Use /api/login for API access']);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method will be intercepted by the logout key.');
    }

    #[Route('/', name: 'app_home')]
    public function home(): JsonResponse
    {
        return $this->json(['message' => 'Welcome to the API']);
    }
}
