import { Link } from "react-router-dom";
import { Trash2Icon } from "lucide-react"; // CHANGED: Removed PenSquareIcon
import { formatDate } from "../lib/utils";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`} // CHANGED: Better hover, transition, and animation
      className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 
                  border border-base-content/10 hover:border-primary animate-fade-in"
    >
           {" "}
      <div className="card-body">
                {/* CHANGED: Made title bolder and truncated it */}       {" "}
        <h3 className="card-title text-base-content font-bold truncate">
                    {note.title}       {" "}
        </h3>
               {" "}
        <p className="text-base-content/70 line-clamp-3 text-sm">
                    {note.content}       {" "}
        </p>
               {" "}
        <div className="card-actions justify-between items-center mt-4">
                   {" "}
          <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}         {" "}
          </span>
                   {" "}
          {/* CHANGED: Removed the Pen icon, improved delete button */}         {" "}
          <button
            className="btn btn-ghost btn-xs text-error/70 hover:text-error hover:bg-error/10"
            onClick={(e) => handleDelete(e, note._id)}
          >
                          <Trash2Icon className="size-4" />           {" "}
          </button>
                   {" "}
        </div>
             {" "}
      </div>
         {" "}
    </Link>
  );
};

export default NoteCard;
