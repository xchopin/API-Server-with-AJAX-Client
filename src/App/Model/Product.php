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

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'price',
        'quantity',
        'file',
    ];

    protected $path = 'public/img/';

    public function getPicturePath()
    {
        return $path . $this->id;
    }

}