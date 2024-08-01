import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { activeTabContext } from "../../context/contextDefine";

export default function DashBoard() {
  const { t } = useTranslation();
  const { logoutUser, getUser } = useAuth();
  const { setIsLoggedIn } = useContext(activeTabContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function findUser() {
    try {
      const token = JSON.stringify(localStorage.getItem("p-vpnToken"));
      const currentUser = await getUser(token);
      console.log(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser.user));
      setUser(currentUser.user);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    findUser();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="relative bg-darkblue w-full min-h-screen px-6">
      {isLoading && (
        <div role="status" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            aria-hidden="true"
            class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-[#F0A927]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}
      {!isLoading && (
        <>
          <h1 className="text-white font-semibold text-[20px] pt-20 ">
            {t("Account Information")}
          </h1>
          <div className="flex flex-row items-center justify-between ms-3 mb-12 mt-12">
            <div>
              <button className="mb-5 flex flex-row items-center space-x-3 justify-between">
                <img src="/images/avatar.svg" alt="avatar" />
                <div className="flex flex-col items-start">
                  <p className="font-normal text-white">{user?.name}</p>
                  <p className="font-normal text-white">{user?.email}</p>
                </div>
              </button>
            </div>
            <button
              className="bg-transparent border-2 border-[#F0A927] rounded-full px-8 py-2 text-white font-semibold"
              onClick={() => {
                logoutUser();
                setIsLoggedIn(false);
              }}
            >
              {t("Sign Out")}
            </button>
          </div>

          <div className="flex flex-row items-center justify-between ps-3 pt-12 border-t border-[#798199]">
            <div className="flex flex-col w-[75%]">
              <p className="text-white">
                {t("Current Plan Details: ")}
                {!user?.hasPackage && (
                  <span className="font-bold">{t("Free")}</span>
                )}
                {user?.hasPackage && (
                  <span className="font-bold">
                    {t(`${user?.package_name}`)}
                  </span>
                )}
              </p>

              {!user?.hasPackage && (
                <p className="text-[#FFFFFF75] w-full">
                  {t(
                    "With our free Private VPN, you can browse safely, knowing your private information is protected. Want faster internet and more places to connect? Check out Private VPN Premium."
                  )}
                </p>
              )}
              {user?.hasPackage && (
                <p className="text-[#FFFFFF75] w-full">
                  {t(
                    `Next payment $${user?.package_price} on ${user?.expiry_date.split(' ')[0]}`
                  )}
                </p>
              )}
            </div>
            <button className="bg-[#F0A927] rounded-full px-8 py-2 text-white font-semibold">
              {t("Upgrade Plan")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
