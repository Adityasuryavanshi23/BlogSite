import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../page/Home";
import { Create } from "../page/Create";
import { PortectedRoute } from "./PortectedRoute";
import { AnimatePresence } from "framer-motion";
export const Allroutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route
          path="/create"
          element={
            <PortectedRoute>
              <Create />
            </PortectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};
