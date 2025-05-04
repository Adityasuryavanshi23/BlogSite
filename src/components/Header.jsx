import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { SyncLoader } from "react-spinners";
import dummy from "../assets/images/avatar-3814049_640.png";
import toast from "react-hot-toast";

export const Header = ({ toggle, settoggle }) => {
  const [darkmode, setdarkmode] = useState(
    JSON.parse(localStorage.getItem("darkmode")) || false
  );
  const [islogin, setislogin] = useState(
    JSON.parse(localStorage.getItem("islogin")) || false
  );
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const movie = location.state?.movie || null;

  const [user, setuser] = useState(localStorage.getItem("user") || false);
  const [photo, setphoto] = useState(localStorage.getItem("photo") || false);

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkmode", darkmode);
  }, [darkmode, toggle]);

  const handlelogin = async () => {
    if (!islogin) {
      try {
        setloading(true);
        const res = await signInWithPopup(auth, provider);
        console.log(res);
        toast.success("logged in");
        setloading(false);
        setislogin(true);
        settoggle(!toggle);
        setuser(res.user.displayName);
        setphoto(res.user.photoURL);
        localStorage.setItem("user", res.user.displayName);
        localStorage.setItem("photo", res.user.photoURL);
        localStorage.setItem("islogin", true);
      } catch (error) {
        toast.error("something went wrong");
        setloading(false);
        console.log(error);
      }
    } else {
      try {
        setloading(true);
        await signOut(auth);
        toast.error("logged out");
        setloading(false);
        setislogin(false);
        settoggle(!toggle);

        localStorage.setItem("islogin", false);
      } catch (error) {
        toast.error("something went wrong");
        setloading(false);
        console.log(error);
      }
    }
  };
  return (
    <header>
      <nav className="flex   justify-between max-w-screen-xl mx-auto py-4">
        <h1 className="text-black text-3xl font-semibold uppercase dark:text-cyan-400 ">
          <Link to={"/"}>BlogSite</Link>{" "}
        </h1>
        <div className="flex justify-between items-center gap-4 ">
          {darkmode ? (
            <i
              onClick={() => setdarkmode(!darkmode)}
              className="fa-solid fa-sun cursor-pointer dark:text-yellow-200"
            ></i>
          ) : (
            <i
              onClick={() => setdarkmode(!darkmode)}
              className="fa-solid fa-moon cursor-pointer"
            ></i>
          )}
          <p className="text-2xl dark:text-white  hover:bg-[#20c2c2]  hover:py-2 hover:rounded-md">
            <NavLink className="px-4 py-2 " to="/">
              Home{" "}
            </NavLink>
          </p>
          {islogin && (
            <p className="text-2xl dark:text-white hover:bg-[#20c2c2]  hover:py-2 hover:rounded-md">
              <NavLink className="px-4 py-2 " to={"/create"}>
                {movie ? "Update" : "Create"}
              </NavLink>
            </p>
          )}

          <div>
            {!islogin && (
              <button
                disabled={loading}
                onClick={handlelogin}
                className={`px-4 py-2 rounded-md text-2xl text-white bg-red-500  capitalize ${
                  loading && "cursor-not-allowed"
                }`}
              >
                {" "}
                {loading ? <SyncLoader color="green" size={5} /> : "login"}
              </button>
            )}
            {islogin && (
              <button
                onClick={handlelogin}
                className="px-4 py-2 rounded-md text-2xl text-white bg-red-500 capitalize hover:bg-red-600"
              >
                {" "}
                logout
              </button>
            )}
          </div>
          {islogin && (
            <>
              <img
                src={photo || dummy}
                alt="avatar"
                className="w-12 h-12 rounded-full border  "
                onError={(e) => {
                  e.target.src = dummy;
                  e.onError = null;
                }}
              />
              <p className="dark:text-white">[ {user} ]</p>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
