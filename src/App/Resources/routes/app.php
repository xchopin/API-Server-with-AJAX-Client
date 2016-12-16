<?php

$app->get('/', 'AppController:home')->setName('home');

$app->get('/api/products', 'AppController:API_Products');

$app->get('/api/basket/{basket_id:[0-9]+}', 'AppController:getBasket');

$app->get('/order', 'AppController:validateProduct');

$app->post('/addProduct/', 'AppController:addProduct');

$app->delete('/clearBasket/{basket_id:[0-9]+}', 'AppController:clearBasket');


