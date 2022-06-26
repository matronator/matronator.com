<?php

namespace App;

require __DIR__ . '/vendor/autoload.php';

use Symfony\Component\Yaml\Yaml;

if (!empty($_POST)) {
    $lang = $_POST['lang'] ?? null;
    if ($lang === null) {
        header("Location: https://www.youtube.com/watch?v=yywxYYk4OWo");
        die();
    }

    $locale = 'en';
    if (preg_match('/en|cs|emoji/i', $lang, $match)) {
        $locale = trim(strtolower($match[0]));
    }

    $strings = Yaml::parseFile(__DIR__ . "/locale/$locale.yaml");
    // $strings = json_decode(file_get_contents(__DIR__ . "/locale/$locale.json"));
    header("Content-Type: application/json");
    echo json_encode($strings);
    die();
}
