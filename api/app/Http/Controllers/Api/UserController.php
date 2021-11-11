<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Logon\UserLoginRequest;
use App\Http\Requests\Logon\UserRegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use function Ramsey\Uuid\v1;

class UserController extends Controller
{
    public function doLogin(UserLoginRequest $request){
        try{
            if(!Auth::attempt($request->validated())){
                throw new \Exception("Unable to login with credentials.");
            }
            return response()->json(['success' => true, 'error' => null, 'data' => ['token' => User::find(Auth::user()->id)->createToken(uniqid())->plainTextToken, 'prefix' => 'Bearer']], 200);
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

    public function doRegister(UserRegisterRequest $request){
        try{
            $user = User::create($request->validated());
            Auth::login($user);

            return response()->json(['success' => true, 'error' => null, 'data' => ['token' => $user->createToken(uniqid())->plainTextToken, 'prefix' => 'Bearer']], 200);
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

    public function doLogout(){
        try{
            Auth::logout();
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
}
