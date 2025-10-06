/*import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import type { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useContext(AuthContext)!;
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
*/

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import type { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("PrivateRoute must be used within an AuthProvider");
  }

  const { token } = context;
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
