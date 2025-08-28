<x-layout title="Welcome😊">
    <h1 class="text-3xl text-center mb-6">Welcome to CRUD App</h1>
    <form method="POST">
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
</x-layout>
