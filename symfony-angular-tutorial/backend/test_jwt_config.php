<?php
require 'vendor/autoload.php';

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Dotenv\Dotenv;

// Cargar .env manualmente
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/.env');

// Simular el kernel para obtener %kernel.project_dir%
$projectDir = realpath(__DIR__);
$privateKeyPath = str_replace('%kernel.project_dir%', $projectDir, getenv('JWT_SECRET_KEY'));
$publicKeyPath = str_replace('%kernel.project_dir%', $projectDir, getenv('JWT_PUBLIC_KEY'));
$passphrase = getenv('JWT_PASSPHRASE');

echo "Project Directory: $projectDir\n";
echo "Private Key Path (from env): $privateKeyPath\n";
echo "Public Key Path (from env): $publicKeyPath\n";
echo "Passphrase: $passphrase\n";
echo "Private Key Exists: " . (file_exists($privateKeyPath) ? "Yes" : "No") . "\n";
echo "Public Key Exists: " . (file_exists($publicKeyPath) ? "Yes" : "No") . "\n";
echo "Private Key Readable: " . (is_readable($privateKeyPath) ? "Yes" : "No") . "\n";
echo "Public Key Readable: " . (is_readable($publicKeyPath) ? "Yes" : "No") . "\n";

// Mostrar contenido de .env para depurar
echo "JWT_SECRET_KEY from getenv: " . getenv('JWT_SECRET_KEY') . "\n";
echo "JWT_PUBLIC_KEY from getenv: " . getenv('JWT_PUBLIC_KEY') . "\n";
