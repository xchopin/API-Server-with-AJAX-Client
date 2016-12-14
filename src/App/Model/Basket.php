<?php
/**
 * Created by PhpStorm.
 * User: xavier
 * Date: 14/12/16
 * Time: 13:09
 */

namespace App\Model;


use Illuminate\Database\Eloquent\Model;


class Basket extends Model
{
    protected $table = 'basket';

    protected $primaryKey = 'id';

    protected $fillable = [
        'price',
    ];

}