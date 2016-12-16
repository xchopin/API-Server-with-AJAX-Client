<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

return [
    'settings' => [

        'determineRouteBeforeAppMiddleware' => false,
        'displayErrorDetails' => true,

        'view' => [
            'template_path' => __DIR__ . '/../src/App/Resources/views',
            'twig' => [
                'cache' => __DIR__ . '/../cache',
                'debug' => true,
                'auto_reload' => true,
            ],
        ],

        'routes' => [
            'dir' => __DIR__ . '/../src/App/Resources/routes',
            'files' => [
                'app',
                'auth'
            ]
        ],

    ],
];