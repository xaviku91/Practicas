<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class TodoController extends AbstractController
{
    private TodoRepository $todoRepository;

    public function __construct(TodoRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    #[Route('/api/endpoint-protegido', name: 'api_endpoint_protegido', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function protectedEndpoint(): JsonResponse
    {
        return $this->json([
            'message' => '¡Bienvenido al endpoint protegido!',
            'user' => $this->getUser()->getUserIdentifier(),
        ]);
    }

    #[Route('/api/todos', name: 'api_todos_list', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function listTodos(): JsonResponse
    {
        $user = $this->getUser();
        $todos = $this->todoRepository->findBy(['user' => $user]);

        return $this->json($todos, 200, [], ['groups' => 'todo:read']);
    }
}
