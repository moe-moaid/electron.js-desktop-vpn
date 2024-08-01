import { useContext, useState } from "react";
import { activeTabContext } from "../../context/contextDefine";
import { useTranslation } from "react-i18next";
import { useShowPagesContext } from "../../context/showPagesContext";

export default function ForgetPass() {
  const { setShowLogin, setShowForgetPass } = useShowPagesContext()
    const [formData, setFormData] = useState({
      email: ''
    });
  const { t } = useTranslation();

  function handleMail(e) {
    const {name, value} = e.target;
    setFormData((prevMail) => {
      const newMail = {
        ...prevMail,
        [name]: value
      }
      return newMail
    })
  }

  return (
    <div className="h-[100vh]">
      {/* Main dark background */}
      <div className="absolute top-0 bottom-0 left-0 right-0 z-30 bg-[#101729]">
        <button
          className="absolute top-5 left-5 z-50"
          onClick={() => {
            setShowForgetPass(false);
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
        <h1 className="text-white flex flex-row justify-center text-[24px] font-bold pt-10">
          {t('Forgot Password')}
        </h1>
        <p className="text-[#B9BBBD] flex flex-row justify-center text-[16px] font-normal pt-4 pb-10 text-center">
          {t('Forgot your password? Enter your email below, and we\'ll send you a link to reset it.')}
        </p>
        <div className="flex flex-col items-center">
          <form className="flex flex-col items-center w-4/5" action="">
            {/* Email div */}
            <div className="flex flex-col w-full">
              <label className="text-[#ACADB1]" htmlFor="email">
                {t("Email")}
              </label>
              <input
                className="text-[#ACADB1] bg-transparent rounded-lg border border-[#48516B] px-2 py-3 w-full mt-1 stroke-none outline-none"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => handleMail(e)}
              />
            </div>

            <button className="main-yellow w-4/5 mt-12 py-3 rounded-full text-[#0B101D] font-bold">
              {t("Send OTP")}
            </button>
          </form>
        </div>
        <button
          className="flex flex-row justify-center yellow-text mx-auto mt-12"
          onClick={() => {
            setShowForgetPass(false);
            setShowLogin(true);
          }}
        >
          {t("Login account")}
        </button>
      </div>
    </div>
  );
}
