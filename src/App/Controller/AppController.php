<?php

namespace App\Controller;

use App\Model\Basket;
use App\Model\Product;
use Illuminate\Database\Capsule\Manager as DB;
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class AppController extends Controller
{
    private function setCORS(Response $response){

        $response =  $response->withHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With, Content-Type, Accept, Origin, Authorization'
        );

        return $response->withHeader('Access-Control-Allow-Methods', 'DELETE,GET,POST,PUT');
    }

    public function home(Request $request, Response $response)
    {
        return $this->view->render($this->setCORS($response), 'App/home.twig');
    }

    public function API_Products(Request $request, Response $response)
    {
        $response = $this->setCORS($response);
        return json_encode(Product::all());
    }

    public function API_Product(Request $request, Response $response)
    {
        $response = $this->setCORS($response);

        $product = Product::find($request->getParam('id'));

        if ($product)
            return json_encode($product);
        else
            return $response->withStatus(404);

    }

    public function addProduct(Request $request, Response $response, $args)
    {
        $response = $this->setCORS($response);

        $product = Product::find($request->getParam('product_id'));
        $basket = Basket::find($request->getParam('basket_id'));

        if ($product && $basket){
            $basketProduct = $basket->products()->where('id', $product->id)->first();

            if ($basketProduct)
                $basket->products()->updateExistingPivot($product->id, ['quantity' => $basketProduct->pivot->quantity + 1]);
            else
                $basket->products()->attach($product, ['quantity' => 1]);

            return $response->withStatus(201);
        }

        return $response->withStatus(404);
    }

    public function getBasket(Request $request, Response $response, $args)
    {
        $response = $this->setCORS($response);

        $basket = Basket::find($args['basket_id']);

        if ($basket)
            return json_encode($basket->products()->get());
        else
            return $response->withStatus(404);
    }

    public function clearBasket(Request $request, Response $response, $args)
    {
        $response = $this->setCORS($response);
        $basket = Basket::find($args['basket_id']);
        if ($basket){
            DB::table('basket_product')->where('basket_id','=',$args['basket_id'])->delete();
            return $response->withStatus(201);
        }

        return $response->withStatus(404);
    }

    public function validateProduct(Request $request, Response $response)
    {
        sleep(rand(1,2.5));
        $response = $this->setCORS($response)->write('validated');
        return $response->withStatus(200);
    }

}