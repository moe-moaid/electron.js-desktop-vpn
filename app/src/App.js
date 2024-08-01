import { useEffect, useState } from "react";
import "./App.css";
import RenderTabs from "./components/renderTabs";
import Sidebar from "./components/sidebar";
import { activeTabContext } from "./context/contextDefine";
import { useShowPagesContext } from "./context/showPagesContext";
import LoaderPage from "./components/mainTabs/loaderPage";
import Popup from "./components/popup";
import i18n from "./i18n";
import Login from "./components/login-sequence/login";
import Signup from "./components/login-sequence/signup";
import ForgetPass from "./components/login-sequence/resetPass";
import ResetPass from "./components/login-sequence/changePass";
import OTPForm from "./components/login-sequence/otpForm";
const electron = window.electronAPI;

function App() {
  const { showLogin, showSignup, showForgetPass, showResetPass, showVerify } =
    useShowPagesContext();
  const [activeTab, setActiveTab] = useState("home");
  const [activeSetting, setActiveSetting] = useState("general");
  const [isLoggedIn, setIsLoggedIn] = useState("general");
  const [servers, setServers] = useState();
  const [activeServer, setActiveServer] = useState();
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false); // Trace the loading status of buttons only to separate it from on boarding loading status
  const [progress, setProgress] = useState(10);
  const [popup, setPopup] = useState(false);
  const [premiumPopup, setPremiumPopup] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  async function getServers() {
    setLoading(true);
    const _BASE_URL = "https://vpnapi.9dtechnologies.dev/api/desktop/servers";
    // const _BASE_URL = "http://172.16.20.98/private.vpn.proxy/public/api/desktop/servers";
    try {
      const response = await fetch(_BASE_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchServers = async () => {
      const serversData = await getServers();
      setServers(serversData);
    };
    fetchServers();
    setPopup(true);

    let currentLang = localStorage.getItem("lang");
    if (currentLang) {
      i18n.changeLanguage(currentLang);
    } else localStorage.setItem("lang", "en");
  }, []);

  // send the servers to electron when they are available:
  useEffect(() => {
    if (servers) {
      electron.send("send-servers", servers);
    }
  }, [servers]);

  useEffect(() => {
    const hasShowPopup = localStorage.getItem("hasShowPopup");
    if (!hasShowPopup) {
      setPremiumPopup(true);
      localStorage.setItem("hasShowPopup", true);
    }
  }, [setPremiumPopup]);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="flex flex-row min-h-screen ">
        <activeTabContext.Provider
          value={{
            activeTab,
            setActiveTab,
            servers,
            activeServer,
            setActiveServer,
            activeSetting,
            setActiveSetting,
            loading,
            setLoading,
            progress,
            setProgress,
            popup,
            setPopup,
            premiumPopup,
            setPremiumPopup,
            isConnected,
            setIsConnected,
            buttonLoading,
            setButtonLoading,
            isLoggedIn,
            setIsLoggedIn,
          }}
        >
          {/* {premiumPopup && <Popup />} */}
          {premiumPopup && <Popup />}

          {loading && <LoaderPage />}
          {showLogin && <Login />}
          {showSignup && <Signup />}
          {showForgetPass && <ForgetPass />}
          {showResetPass && <ResetPass />}
          {showVerify && <OTPForm />}
          <Sidebar />
          <RenderTabs />
        </activeTabContext.Provider>
      </div>
    </div>
  );
}

export default App;

// function App() {
// const [state, setState] = useState({
// activeTab: 'home',
// activeSetting: 'general',
// servers: null,
// activeServer: null,
// loading: true,
// progress: 10,
// popup: false,
// premiumPopup: false,
// });

// const setServers = useCallback((servers) => {
// setState((prevState) => ({ ...prevState, servers, loading: false }));
// }, []);

// const setPopup = useCallback((popup) => {
// setState((prevState) => ({ ...prevState, popup }));
// }, []);

// const setPremiumPopup = useCallback((premiumPopup) => {
// setState((prevState) => ({ ...prevState, premiumPopup }));
// }, []);

// const getServers = useCallback(async () => {
// setState((prevState) => ({ ...prevState, loading: true }));
// const _BASE_URL = 'https://vpnapi.9dtechnologies.dev/api/servers';
// try {
// const response = await fetch(_BASE_URL, {
// headers: {
// 'Content-Type': 'application/json',
// },
// });

// if (!response.ok) {
// throw new Error('Network response was not ok');
// }

// const data = await response.json();
// setServers(data);
// } catch (error) {
// console.error('Error fetching data:', error);
// }
// }, [setServers]);

// useEffect(() => {
// getServers();
// setPopup(true);
// }, [getServers, setPopup]);

// useEffect(() => {
// const hasShowPopup = localStorage.getItem('hasShowPopup');
// if (!hasShowPopup) {
// setPremiumPopup(true);
// localStorage.setItem('hasShowPopup', 'true');
// }
// }, [setPremiumPopup]);

// const contextValue = useMemo(() => ({
// ...state,
// setActiveTab: (activeTab) => setState((prevState) => ({ ...prevState, activeTab })),
// setActiveServer: (activeServer) => setState((prevState) => ({ ...prevState, activeServer })),
// setActiveSetting: (activeSetting) => setState((prevState) => ({ ...prevState, activeSetting })),
// setLoading: (loading) => setState((prevState) => ({ ...prevState, loading })),
// setProgress: (progress) => setState((prevState) => ({ ...prevState, progress })),

// setPopup,
// setPremiumPopup,
// }), [state, setPopup, setPremiumPopup]);

// return (
// <div className="App">
// <header className="App-header"></header>
// <div className="flex flex-row min-h-screen ">
// <activeTabContext.Provider value={contextValue}>
// {state.premiumPopup && <Popup />}
// {state.loading && <LoaderPage />}
// <Sidebar />
// <RenderTabs />
// </activeTabContext.Provider>
// </div>
// </div>
// );
// }

// export default App;