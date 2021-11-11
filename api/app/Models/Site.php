<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'url',
        'validations',
        'last_score',
        'average',
        'run_subsites',
        'stamp_level'
    ];

    public function subsites(){
        return $this->hasMany('App\Models\Subsite');
    }

    public function history(){
        return $this->hasMany('App\Models\History');
    }

    public function detail(){
        return $this->hasMany('App\Models\Detail');
    }
}
