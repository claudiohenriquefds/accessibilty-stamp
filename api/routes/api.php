<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DataController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\SiteController;
use App\Http\Controllers\Api\StampController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [UserController::class, 'doLogin']);
Route::get('/logout', [UserController::class, 'doLogout']);
Route::post('/register', [UserController::class, 'doRegister']);

Route::get('/stamp', [StampController::class, 'show'])->middleware('cors');
Route::get('/stamp/info/{site_id}', [StampController::class, 'info']);

Route::get('/followup/{category_id}', [DataController::class, 'followUp']);
Route::get('category/list', [CategoryController::class, 'list']);

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::group(['prefix' => 'category'], function(){
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::get('/{id}', [CategoryController::class, 'show']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'delete']);
    });

    Route::group(['prefix' => 'site'], function(){
        Route::post('/', [SiteController::class, 'store']);
        Route::get('/', [SiteController::class, 'index']);
        Route::delete('/{site_id}', [SiteController::class, 'delete']);
        Route::get('/{site_id}', [SiteController::class, 'show']);
        Route::get('/details/{site_id}', [SiteController::class, 'getDetailed']);
    });

    Route::get('/history/{site_id}', [HistoryController::class, 'show']);

    Route::get('/data/{site_id}', [DataController::class, 'show']);
});
