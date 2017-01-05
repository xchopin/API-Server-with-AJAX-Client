# CORS-Compliant REST API Server with AJAX Client
This is a quick demonstration of a CORS-Compliant REST API Server, written in PHP with a JQuery Client using AJAX for its CORS-requests.

## Engines used
- Ajax
- Eloquent ORM
- jQuery
- Slim Micro framework
- Twig
- Twitter Bootstrap


## Installation
### 1. Create project

```
$ git clone https://github.com/xchopin/REST-and-Ajax-Demo.git
$ composer install
```

### 2. Setup permissions
```
$ cd yourProject
$ chmod 777 cache
```

### 3. Edit database settings
```
$ sudo cp bootstrap/db.php.dist db.php
$ sudo nano bootstrap/db.php
```

### 4. Create your database and import the structure
Run your favorite database management software such as phpMyAdmin, create a database and import bootstrap/installation.sql

## Key directories
- `bootstrap`: Configuration files
- `cache`: Twig cache
- `public`: Public resources accessible from a web browser
- `src`: Application source code
- `src/App/Controller`: Application controllers
- `src/App/Model`: Eloquent model classes
- `src/App/Resources/routes`: Application routes
- `src/App/Resources/views`: Twig templates
- `src/App/Service`: Additional services

## Key files
- `public/index.php`: Application entry point
- `bootstrap/controllers.php`: Registers every controller in the app container
- `bootstrap/db.php`: Database configuration file
- `bootstrap/dependencies.php`: Services for Pimple
- `bootstrap/middleware.php`: Application middleware
- `bootstrap/settings`: Application configuration
- `src/App/Controller/Controller.php`: Base controller. All controllers should extend this class
- `src/App/Resources/routes/app.php`: Main routing file (API)
