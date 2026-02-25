import { useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";

const AddTask = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async () => {
    await api.post("/tasks", form);
    toast.success("Task Created");
    setForm({ title: "", description: "" });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl">

      <h2 className="text-xl font-bold mb-4">Create Task</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e)=>setForm({...form,title:e.target.value})}
        className="border p-2 w-full mb-3 rounded"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e)=>setForm({...form,description:e.target.value})}
        className="border p-2 w-full mb-3 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;