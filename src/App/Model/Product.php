<?php
/**
 * Created by PhpStorm.
 * User: xavier
 * Date: 13/12/16
 * Time: 23:17
 */

namespace App\Model;


use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';

    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'price',
        'quantity',
        'file',
    ];

    public function getPicturePath()
    {
        $path = __DIR__ . '/../../../public/img/';
        return $path . $this->id;
    }

    public function baskets()
    {
        return $this->belongsToMany('App\Model\Product')->withPivot('quantity');
    }





}