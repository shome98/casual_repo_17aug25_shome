<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    //
    public function createPost(Request $request){
        $incomingFields=$request->validate([
            'title'=>'required',
            'body'=>'required'
        ]);
        $incomingFields['title']=strip_tags($incomingFields['title']);
        $incomingFields['body']=strip_tags($incomingFields['body']);
        if (!auth()->check()) {
            return redirect('/')->with('error', 'Please log in first.');
        }
        $incomingFields['user_id']=auth()->id();
        Post::create($incomingFields);
        return redirect('/');
    }
    public function showEditScreen(Post $post){
        if (auth()->user()->id !== $post['user_id']) {
            return redirect('/');
        }

        return view('edit-post', ['post' => $post]);
    }
}
