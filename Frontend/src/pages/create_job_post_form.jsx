import { useState, useEffect } from "react";

export default function JobPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });

  const [posts, setPosts] = useState([]); // ✅ Local dummy posts
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company) return;

    setLoading(true);

    // ✅ FUTURE: Backend API call
    /*
    await axios.post("/api/jobs", formData);
    */

    // ✅ Local simulation
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleString(),
      };
      setPosts([newPost, ...posts]); // Add to local state
      setFormData({ title: "", company: "", location: "", description: "", salary: "" });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="h-screen flex justify-center items-start bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Create Job Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            rows={4}
          />
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>

        {/* Job Posts List */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {posts.length === 0 && <p className="text-gray-500 text-center">No job posts yet.</p>}
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded-xl bg-purple-50 hover:bg-purple-100 transition"
            >
              <h3 className="font-bold text-purple-600">{post.title}</h3>
              <p className="text-gray-700">{post.company} - {post.location}</p>
              <p className="text-gray-600 mt-1">{post.description}</p>
              <p className="text-sm text-gray-500 mt-1">Salary: {post.salary} | Posted: {post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
