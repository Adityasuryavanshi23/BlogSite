import toast from "react-hot-toast";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Blogscards = ({ movie, toggle, settoggle }) => {
  const islogin = JSON.parse(localStorage.getItem("islogin")) || false;
  const { name, story, author, id } = movie;
  const movieref = doc(db, "movies", id);
  const nav = useNavigate();

  const deletmovie = async () => {
    await deleteDoc(movieref);
    toast.error("Movie Deleted Suucessfully");
    console.log("deleted");
    settoggle(!toggle);
  };

  const updatedoc = () => {
    nav("/create", { state: { movie } });
  };

  return (
    <div className="max-w-screen-lg border-2 border-black dark:border-gray-400 dark:shadow-xl dark:shadow-gray-800 rounded-md shadow-lg p-4 mb-8 mx-auto dark:text-white">
      <div className="flex justify-between items-center">
        <p className="text-2xl capitalize  font-bold dark:text-cyan-400">
          title :{" "}
          <span className="text-2xl  font-medium dark:text-white">{name}</span>
        </p>
        {islogin && auth.currentUser.uid === author.id && (
          <i
            onClick={updatedoc}
            className="fa-solid fa-pen-to-square text-green-400 text-2xl cursor-pointer hover:scale-125 transition-all ease-in"
          ></i>
        )}
      </div>
      <p className="text-2xl capitalize  font-bold dark:text-cyan-400 ">
        Description
        <span className="text-lg  font-medium dark:text-white"> : {story}</span>
      </p>
      <div className="flex justify-between items-center">
        <p className="mt-4 ">
          {" "}
          <span className=" bg-cyan-700 rounded-md text-white hover:text-gray-300 text-lg px-4 py-2">
            {author.name}
          </span>
        </p>
        {islogin && author.id === auth.currentUser.uid && (
          <i
            onClick={deletmovie}
            className="fa-solid fa-trash-can cursor-pointer text-2xl text-red-500 hover:scale-125 transition-all ease-in"
          ></i>
        )}
      </div>
    </div>
  );
};
