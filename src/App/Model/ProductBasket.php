<?php
/**
 * Created by PhpStorm.
 * User: xavier
 * Date: 14/12/16
 * Time: 13:14
 */

namespace App\Model;


use Illuminate\Database\Eloquent\Model;

class ProductBasket extends Model
{
    protected $table = 'product_basket';

    public $timestamps = false;

    protected $fillable = ['quantity'];

}