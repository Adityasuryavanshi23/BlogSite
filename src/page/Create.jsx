import { useEffect, useRef } from "react";
import { addDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { collection } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PageTrans } from "../components/PageTrans";

export const Create = () => {
  const name = useRef();
  const story = useRef();
  const Navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie || null;
  const movieref = collection(db, "movies");

  useEffect(() => {
    if (movie) {
      name.current.value = movie.name;
      story.current.value = movie.story;
    }
  }, [movie]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (movie) {
      try {
        const res = await updateDoc(doc(db, "movies", movie.id), {
          name: name.current.value,
          story: story.current.value,
        });
        console.log(res);
        Navigate("/");
        toast.success("Movie Updated");
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    } else {
      try {
        const res = await addDoc(movieref, {
          name: name.current.value,
          story: story.current.value,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
          },
        });

        name.current.value = "";
        story.current.value = "";
        Navigate("/");
        toast.success("Movie Added");
        console.log(res);
      } catch (err) {
        toast.error("Something went wrong");
        console.log(err);
      }
    }
  };
  return (
    <PageTrans>
      <div className="max-w-screen-md mx-auto  p-4 ">
        <h1 className="text-center text-3xl font-medium capitalize dark:text-cyan-400">
          {movie ? "Update  Blog" : "Add a Blog"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
          <input
            type="text"
            placeholder="name..."
            className="placeholder:text-2xl text-black border-2 p-2 focus:outline-none dark:bg-gray-700 dark:text-white focus:scale-110 transition-all  ease-in-out border-gray-400"
            ref={name}
            required
          />
          <textarea
            ref={story}
            placeholder="story....."
            className="placeholder:text-2xl text-black border-2 px-2 focus:outline-none resize-none dark:bg-gray-700 dark:text-white focus:scale-110 transition-all  ease-in-out border-gray-400"
            type="text"
            rows="10"
            cols="10"
            required
          ></textarea>
          <div className="text-center px-4">
            <button className="bg-green-500 px-12 w-full py-2 text-white text-lg">
              create{" "}
            </button>
          </div>
        </form>
      </div>
    </PageTrans>
  );
};
