import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShowPagesContext } from "../../context/showPagesContext";
import { useAuth } from "../../context/AuthContext";
import { activeTabContext } from "../../context/contextDefine";
import Loading from "../loading";

export default function Login() {
  const { setShowLogin, setShowSignup, setShowForgetPass, setShowDashboard, setShowVerify } = useShowPagesContext();
  const { setButtonLoading, setIsLoggedIn } = useContext(activeTabContext);
  const { loginUser } = useAuth();
  const { t } = useTranslation();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [apiRes, setApiRes] = useState({
    status: null,
    message: '',
    code: null,
  });

  function handleFormFilling(e) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };
      return newData;
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    setButtonLoading(true);
    try {
    const res = await loginUser({...formData});
    console.log(res);
    setApiRes(res);
    if (res.status === true) {
      setIsLoggedIn(true);     
      setShowDashboard(true);
      setShowLogin(false);
    } else if (res.code === 401) {
      setShowVerify(true);
      setShowLogin(false);
    }
    } catch(error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  }

  console.log(apiRes);
  return (
    <div className="h-[100vh]">
      {/* Main dark background */}
      <div className="absolute top-0 bottom-0 left-0 right-0 z-30 bg-[#101729]">
        <button
          className="absolute top-5 left-5 z-50"
          onClick={() => {
            setShowLogin(false);
          }}
        >
          <svg
            width="30"
            height="22"
            viewBox="0 0 30 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.3332 9.66661H4.88521L11.9425 2.60928C12.0699 2.48628 12.1715 2.33916 12.2413 2.17648C12.3112 2.01381 12.348 1.83885 12.3495 1.66181C12.3511 1.48477 12.3173 1.3092 12.2503 1.14534C12.1833 0.981478 12.0843 0.832609 11.9591 0.707419C11.8339 0.582228 11.685 0.483224 11.5212 0.416183C11.3573 0.349142 11.1817 0.315406 11.0047 0.316945C10.8276 0.318483 10.6527 0.355265 10.49 0.425144C10.3273 0.495022 10.1802 0.596599 10.0572 0.723946L0.723878 10.0573C0.473917 10.3073 0.333496 10.6464 0.333496 10.9999C0.333496 11.3535 0.473917 11.6926 0.723878 11.9426L10.0572 21.2759C10.3087 21.5188 10.6455 21.6532 10.9951 21.6502C11.3447 21.6471 11.6791 21.5069 11.9263 21.2597C12.1735 21.0125 12.3137 20.6781 12.3168 20.3285C12.3198 19.9789 12.1854 19.6421 11.9425 19.3906L4.88521 12.3333H28.3332C28.6868 12.3333 29.026 12.1928 29.276 11.9428C29.5261 11.6927 29.6665 11.3536 29.6665 10.9999C29.6665 10.6463 29.5261 10.3072 29.276 10.0571C29.026 9.80709 28.6868 9.66661 28.3332 9.66661Z"
              fill="#F5F5F5"
            />
          </svg>
        </button>
      </div>
      {/* Inner form card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#121B32] rounded-3xl w-[50%] p-5">
        <h1 className="text-white flex flex-row justify-center text-[24px] font-bold py-10">
          Login Account
        </h1>
        <div className="flex flex-col items-center">
          <form className="flex flex-col items-center w-4/5" onSubmit={handleFormSubmit}>
            {/* Email div */}
            <div className="flex flex-col w-full">
              {
                (apiRes.code === 400 || apiRes.code === 404) && (
                  <p className="text-[14px] text-[#ED1C24] mb-4 mx-auto">{apiRes.message}</p>
                )
              }
              <label className="text-[#ACADB1]" htmlFor="email">
                {t("Email")}
              </label>
              <input
                className={`text-[#ACADB1] bg-transparent rounded-lg border ${apiRes.code === 400 ? 'border-[#ED1C24]' : 'border-[#48516B]'}  px-2 py-3 w-full mt-1 stroke-none outline-none`}
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => handleFormFilling(e)}
                required
              />
            </div>
            {/* Password outer div */}
            <div className="flex flex-col w-full mt-5">
              <label className="text-[#ACADB1]" htmlFor="password">
                {t("Password")}
              </label>
              {/* Password Inner div */}
              <div className={`flex flex-row items-center justify-between rounded-lg border ${apiRes.code === 404 ? 'border-[#ED1C24]' : 'border-[#48516B]'} px-2 py-3 mt-1`}>
                <input
                  className="text-[#ACADB1] bg-transparent rounded-lg w-full stroke-none outline-none"
                  name="password"
                  value={formData.password}
                  type={`${showPass ? "text" : "Password"}`}
                  placeholder={t("Password")}
                  onChange={(e) => handleFormFilling(e)}
                  required
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPass(!showPass);
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5299 9.46998L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.41998 11.9999 8.41998C12.9899 8.41998 13.8799 8.81998 14.5299 9.46998Z"
                      stroke="#B9BBBD"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
                      stroke="#B9BBBD"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.41992 19.53C9.55992 20.01 10.7699 20.27 11.9999 20.27C15.5299 20.27 18.8199 18.19 21.1099 14.59C22.0099 13.18 22.0099 10.81 21.1099 9.39999C20.7799 8.87999 20.4199 8.38999 20.0499 7.92999"
                      stroke="#B9BBBD"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52"
                      stroke="#B9BBBD"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.47 14.53L2 22"
                      stroke="#B9BBBD"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.9998 2L14.5298 9.47"
                      stroke="#B9BBBD"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button className="main-yellow w-4/5 mt-12 py-3 rounded-full text-[#0B101D] font-bold" type="submit">
              <Loading text='Login account' loadingText='Verifying' />
              {/* {t("Login account")} */}
            </button>
          </form>
          <button
            className="yellow-text text-[16px] font-semibold mt-6"
            onClick={() => {
              setShowLogin(false);
              setShowForgetPass(true);
            }}
          >
            {t("Forgot password?")}
          </button>
        </div>
        <p className="text-[#ACADB1] mt-28 flex flex-row justify-center">
          {t("Don’t have account?")}
          <button
            className="yellow-text ms-1"
            onClick={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          >
            {t("Create account")}
          </button>
        </p>
      </div>
    </div>
  );
}
