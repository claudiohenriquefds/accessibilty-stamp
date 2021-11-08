<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    use HasFactory;

    protected $fillable = [
        'subsite',
        'url',
        'element',
        'veredict',
        'description'
    ];

    public function detailElements(){
        return $this->hasMany('App\Models\DetailElement');
    }
}
