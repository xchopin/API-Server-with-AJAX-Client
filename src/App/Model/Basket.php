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
    const OPEN = 0;

    const CLOSED = 1;

    protected $table = 'basket';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'price',
        'state',
    ];

    public function isClosed()
    {
        return ($this->state == CLOSED);
    }

    public function switchState()
    {
        $this->isClosed() ? $this->state = OPEN : $this->state = CLOSED;
    }

    public function products()
    {
        return $this->belongsToMany('App\Model\Product')->withPivot('quantity');
    }

}