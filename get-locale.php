<?php

if (!empty($_POST)) {
    $lang = $_POST['lang'] ?? null;
    if ($lang === null) {
        header("Location: https://www.youtube.com/watch?v=yywxYYk4OWo");
        die();
    }
    if ($lang === 'emoji') {
        $locale = json_decode(file_get_contents(__DIR__ . '/locale/emoji.json'));
    } else {
        $locale = json_decode(file_get_contents(__DIR__ . '/locale/en_US.json'));
    }
    header("Content-Type: application/json");
    echo json_encode($locale);
    die();
}
