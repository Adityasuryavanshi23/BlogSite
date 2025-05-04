import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import { Blogscards } from "../components/Blogscards";
import { PageTrans } from "../components/PageTrans";

export const Home = () => {
  const [movies, setmovies] = useState([]);
  const [toggle, settoggle] = useState(false);

  const movieref = collection(db, "movies");

  useEffect(() => {
    const fetchmovies = async () => {
      const data = await getDocs(movieref);
      setmovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    console.log(movies);

    fetchmovies();
  }, [toggle]);
  return (
    <PageTrans>
      <div>
        {movies.length === 0 ? (
          <h1 className="text-center dark:text-white text-black  text-2xl   capitalize ">
            not have post Blog yet pls staytune! for more blogs....😊
          </h1>
        ) : (
          movies.map((movie) => (
            <Blogscards
              movie={movie}
              key={movie.id}
              toggle={toggle}
              settoggle={settoggle}
            />
          ))
        )}
      </div>
    </PageTrans>
  );
};
