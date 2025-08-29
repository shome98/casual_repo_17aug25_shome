<x-layout title="Welcome😊">
    <h1 class="text-3xl text-center mb-6">Welcome to CRUD App</h1>
    @auth
       <p>Congrats you are logged in!💖</p>
       <form action="/logout" method="POST">
        @csrf
        <button class="button-red">Log out</button></form>
<br/>
        <form method="POST" action="/create-post">
            @csrf
            <div class="box-2">
                <h1 class="text-2xl text-center">Create a Post</h1>
<div class="flex-col-2">
                <label for="title" class="label-normal">Title</label>
                <input id="title" name="title" type="text" class="input-normal"
                    placeholder="Enter a post title..." required>
            </div>
            <div class="flex-col-2">
                <label for="body" class="label-normal">Body</label>
                <textarea id="body" name="body" type="password" class="input-normal"
                    placeholder="Enter post details..."></textarea>
            </div>
            <button type="submit" class="button-blue-2">
                Save post
            </button>
            </div>
        </form>
    @else
    <form method="POST" action='/register'>
        @csrf
        <div class="box-2">
            <div class="flex-col-2">
                <label for="name" class="label-normal">Name</label>
                <input id="name" name="name" type="text" class="input-normal" placeholder="Enter your name..."
                    required>
            </div>
            <div class="flex-col-2">
                <label for="email" class="label-normal">Email</label>
                <input id="email" name="email" type="email" class="input-normal"
                    placeholder="Enter your email..." required>
            </div>
            <div class="flex-col-2">
                <label for="password" class="label-normal">Password</label>
                <input id="password" name="password" type="password" class="input-normal"
                    placeholder="Enter your password..." required>
            </div>
            <button type="submit" class="button-blue-2">
                Register
            </button>
        </div>
    </form>
    <br/>
    <form method="POST" action='/login'>
        @csrf
        <div class="box-2">
            <div class="flex-col-2">
                <label for="loginEmail" class="label-normal">Email</label>
                <input id="loginEmail" name="loginEmail" type="email" class="input-normal"
                    placeholder="Enter your email..." required>
            </div>
            <div class="flex-col-2">
                <label for="loginPassword" class="label-normal">Password</label>
                <input id="loginPassword" name="loginPassword" type="password" class="input-normal"
                    placeholder="Enter your password..." required>
            </div>
            <button type="submit" class="button-blue-2">
                Login
            </button>
        </div>
    </form>
    @endauth
    
</x-layout>
