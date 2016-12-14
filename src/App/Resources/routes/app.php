<?php

$app->get('/', 'AppController:home')->setName('home');

$app->get('/api/products', 'AppController:API_Products');