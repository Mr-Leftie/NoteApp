import { Link } from "react-router-dom";
import { PlusIcon, NotebookPenIcon } from "lucide-react"; // CHANGED: Added another icon

const Navbar = () => {
  return (
    // CHANGED: Added shadow and sticky position
    <header className="bg-base-300 border-b border-base-content/10 shadow-lg sticky top-0 z-50">
           {" "}
      <div className="mx-auto max-w-7xl px-4 py-4">
        {" "}
        {/* CHANGED: max-w-7xl */}       {" "}
        <div className="flex items-center justify-between">
                   {" "}
          {/* CHANGED: Title is now a link to home, with icon and hover effect */}
                   {" "}
          <Link
            to="/"
            className="text-3xl font-bold text-primary font-mono tracking-tight flex items-center gap-2
                      transition-all hover:text-primary-focus"
          >
                        <NotebookPenIcon className="size-7" />           
            EasyNotes          {" "}
          </Link>
                   {" "}
          <div className="flex items-center gap-4">
                       {" "}
            <Link
              to="/create" // CHANGED: Added hover transition
              className="btn btn-primary btn-sm flex items-center gap-2 transition-all hover:shadow-lg"
            >
                            <PlusIcon className="h-4 w-4" />              New
              Note            {" "}
            </Link>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </header>
  );
};

export default Navbar;
