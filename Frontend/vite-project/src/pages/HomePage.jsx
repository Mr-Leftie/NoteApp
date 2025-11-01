// REMOVED: Navbar import
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes", error); // CHANGED: log the error
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    // CHANGED: Simplified wrapper, removed min-h-screen (now in App.jsx)
    <div>
            {/* REMOVED: Navbar */}      {isRateLimited && <RateLimitedUI />}   
        {/* ADDED: Page title */}     {" "}
      <h2 className="text-3xl font-bold tracking-tight mb-6">Your Notes</h2>   
        {/* CHANGED: Swapped text for a DaisyUI loading spinner */}     {" "}
      {loading && (
        <div className="text-center py-20">
                   {" "}
          <span className="loading loading-spinner loading-lg text-primary"></span>
                 {" "}
        </div>
      )}
            {/* ADDED: a !loading check to prevent flash of "Not Found" */}     {" "}
      {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}   
       {" "}
      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {" "}
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
                   {" "}
        </div>
      )}
         {" "}
    </div>
  );
};
export default HomePage;
