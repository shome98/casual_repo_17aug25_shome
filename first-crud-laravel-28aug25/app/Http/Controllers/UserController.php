<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rule; 

class UserController extends Controller
{
   public function register(Request $request){
    $incomingFields=$request->validate([
        'name'=>['required','min:3'],
        'email'=>['required','email',Rule::unique('users','email')],
        'password'=>['required','min:4'],
    ]);
    $incomingFields['password']=bcrypt($incomingFields['password']);
    $incomingUser=User::create($incomingFields);
    auth()->login($incomingUser);
    return redirect('/');
   }
   public function logout(){
    auth()->logout();
    return redirect('/');
   }
}
