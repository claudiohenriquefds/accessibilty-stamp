<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryRequest;
use App\Http\Requests\Category\CategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function list(){
        try{
            $categories = Category::all();

            return response()->json([
                'success' => true,
                'error' => null,
                'data' => $categories ?? null
            ], 200);
        }catch(\Exception $exception){
            return response()->json([
                'success' => false,
                'error' => [
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'message' => $exception->getMessage(),
                    'trace' => $exception->getTraceAsString()
                ],
                'data' => null
            ], 400);
        }
    }
    public function index(){
        try{
            $categories = collect(Category::where('user_id', Auth::user()->id)->get())->map(function($category){
                $category->count_sites = $category->sites()->count();
                return $category;
            });


            return response()->json([
                'success' => true,
                'error' => null,
                'data' => $categories ?? null
            ], 200);
        }catch(\Exception $exception){
            return response()->json([
                'success' => false,
                'error' => [
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'message' => $exception->getMessage(),
                    'trace' => $exception->getTraceAsString()
                ],
                'data' => null
            ], 400);
        }
    }

    public function store(CategoryRequest $request){
        try{
            $site = Category::create([
                'name' => $request->get('name'),
                'user_id' => Auth::user()->id
            ]);

            return response()->json(['success' => true, 'error' => null, 'data' => null], 200);
        }catch(\Exception $exception){
            return response()->json([
                'success' => false,
                'error' => [
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'message' => $exception->getMessage(),
                    'trace' => $exception->getTraceAsString()
                ],
                'data' => null
            ], 400);
        }
    }

    public function show($id){
        try{
            $category = Category::find($id);


            return response()->json([
                'success' => true,
                'error' => null,
                'data' => $category ?? null
            ], 200);
        }catch(\Exception $exception){
            return response()->json([
                'success' => false,
                'error' => [
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'message' => $exception->getMessage(),
                    'trace' => $exception->getTraceAsString()
                ],
                'data' => null
            ], 400);
        }
    }

    public function update($id, CategoryUpdateRequest $request){
        try{
            if(!isset($id)){
                throw new \Exception("ID can't be null");
            }

            Category::where('id', $id)->update([
                'name' => $request->get('name')
            ]);

            return response()->json([
                'success' => true,
                'error' => null,
                'data' => null
            ], 200);
        }catch(\Exception $exception){
            return response()->json([
                'success' => false,
                'error' => [
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'message' => $exception->getMessage(),
                    'trace' => $exception->getTraceAsString()
                ],
                'data' => null
            ], 400);
        }
    }

    public function delete($id){
        try{
            if(!isset($id)){
                throw new \Exception("ID can't be null");
            }

            Category::where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'error' => null,
                'data' => null
            ], 200);
        }catch(\Exception $exception){
            return response()->json([
                'success' => false,
                'error' => [
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'message' => $exception->getMessage(),
                    'trace' => $exception->getTraceAsString()
                ],
                'data' => null
            ], 400);
        }
    }
}
