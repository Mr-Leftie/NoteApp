import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios.js";
import { Link } from "react-router-dom";
const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to load note.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false); // ADDED
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
                <LoaderIcon className="animate-spin size-10 text-primary" />   
         {" "}
      </div>
    );
  }
  if (!note) {
    return (
      <div className="text-center py-10">
                <h2 className="text-2xl font-bold">Note not found</h2>       {" "}
        <Link to="/" className="btn btn-primary btn-sm mt-4">
                    Go Home        {" "}
        </Link>
             {" "}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="btn btn-ghost gap-2 text-base-content/70 hover:text-base-content"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
              disabled={deleting}
            >
              {deleting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <Trash2Icon className="h-5 w-5" />
              )}
                        {deleting ? "Deleting..." : "Delete Note"}
            </button>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4 text-2xl">Edit Note</h2>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-40"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving && (
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                  )}
                                {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
