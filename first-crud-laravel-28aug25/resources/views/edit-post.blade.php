<x-layout title="Edit {{$post->id}}">
        <form action="" method="POST">
            @csrf
            @method('PUT')
            <div class="box-2">
                <h1 class="text-2xl text-center">Create a Post</h1>
                <div class="flex-col-2">
                    <label for="title" class="label-normal">Title</label>
                    <input id="title" name="title" type="text" class="input-normal"
                        placeholder="Enter a post title..." value="{{$post->title}}" required>
                </div>
                <div class="flex-col-2">
                    <label for="body" class="label-normal">Body</label>
                    <textarea id="body" name="body" class="input-normal" placeholder="Enter post details..." required>{{$post->body}}</textarea>
                </div>
                <button type="submit" class="button-blue-2">
                    Save changes
                </button>
            </div>
        </form>
</x-layout>