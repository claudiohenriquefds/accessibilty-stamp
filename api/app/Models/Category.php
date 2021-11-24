<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name'
    ];

    protected $table = 'categories';

    public function sites(){
        return $this->hasMany('App\Models\Site');
    }
}
