<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Validar datos básicos
        if (!isset($data['email']) || !isset($data['plainPassword']) || !isset($data['plainPassword']['first']) || !isset($data['plainPassword']['second'])) {
            return $this->json(['errors' => 'Faltan campos requeridos (email o plainPassword)'], 400);
        }

        if ($data['plainPassword']['first'] !== $data['plainPassword']['second']) {
            return $this->json(['errors' => 'Las contraseñas no coinciden'], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword(
            $passwordHasher->hashPassword(
                $user,
                $data['plainPassword']['first']
            )
        );

        try {
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->json(['message' => 'Usuario registrado con éxito'], 201);
        } catch (\Exception $e) {
            return $this->json(['errors' => 'Error al registrar el usuario: ' . $e->getMessage()], 400);
        }
    }
}
