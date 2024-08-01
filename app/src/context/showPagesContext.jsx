import { createContext, useContext, useState } from "react";

export const showPagesContext = createContext();

export const ShowPagesContextProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgetPass, setShowForgetPass] = useState(false);
  const [showResetPass, setShowResetPass] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  return (
    <showPagesContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showSignup,
        setShowSignup,
        showForgetPass,
        setShowForgetPass,
        showResetPass,
        setShowResetPass,
        showVerify,
        setShowVerify,
        showDashboard,
        setShowDashboard
      }}
    >
      {children}
    </showPagesContext.Provider>
  );
};

export const useShowPagesContext = () => {
  return useContext(showPagesContext);
};
