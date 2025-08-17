import { useState } from "react";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]); // feed ke liye

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image) {
      alert("Please write something or upload an image!");
      return;
    }

    const newPost = {
      id: Date.now(),
      text,
      image: image ? URL.createObjectURL(image) : null, // frontend preview ke liye
      createdAt: new Date().toLocaleString(),
    };

    // 🚀 Abhi frontend me store ho raha hai
    setPosts([newPost, ...posts]);

    // 🚀 Backend add karne ke baad:
    /*
    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    const res = await axios.post("http://localhost:5000/api/posts", formData);
    setPosts([res.data, ...posts]); // backend response se update
    */

    setText("");
    setImage(null);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {/* Post Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
        </form>
      </div>

      {/* Post Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet...</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-2xl shadow-md"
            >
              <p className="text-gray-800 mb-2">{post.text}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full rounded-lg mb-2"
                />
              )}
              <p className="text-xs text-gray-400">Posted at {post.createdAt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
