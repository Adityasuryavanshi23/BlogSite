import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Allroutes } from "./routes/Allroutes";
import { useState } from "react";

function App() {
  const [toggle, settoggle] = useState(false);
  return (
    <div className="app dark:bg-slate-700 min-h-screen">
      <Header toggle={toggle} settoggle={settoggle} />
      <main className="min-h-[80vh] max-w-screen-xl mx-auto p-4">
        <Allroutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
