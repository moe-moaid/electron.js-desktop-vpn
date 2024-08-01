import React, { useState } from "react";
import Dropdown from "../dropdown";
import Toggle from "../toggle";
import { useTranslation } from "react-i18next";

export default function General() {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(() => {
    return {
      launch: JSON.parse(localStorage.getItem('launch') || 'false'),
      notifications: JSON.parse(localStorage.getItem('notifications') || 'false'),
      autoConnect: JSON.parse(localStorage.getItem('autoconnect') || 'false'),
    }
  });

  const handleToggle = (setting) => {
    const newToggledState = !isToggled[setting];
    setIsToggled((prev) => {
      const newState = {...prev, [setting]: !prev[setting]};
      localStorage.setItem(setting, JSON.stringify(newState[setting]));
      return newState;
    })

    if(setting === 'notifications') {
      window.electronAPI.send('toggle-notification', newToggledState);
    } else if(setting === 'launch') {
      window.electronAPI.send('set-launch-at-startup', newToggledState);
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-between items-center px-20 pt-10">
        <div>
          <p className="font-bold text-[#F5F5F5] text-[20px]">{t('App Language')}</p>
          <p className="font-normal text-[#B9BBBD] text-[16px]">
            {t('Change language any time to use throughout the app')}
          </p>
        </div>
        <Dropdown />
      </div>
      {/* windows startup */}
      <div className="flex flex-row justify-between items-center mx-20 mt-14 py-5 border-t border-[#C8C8C83D]">
        <div>
          <p className="font-bold text-[#F5F5F5] text-[20px]">
            {t('Launch at windows startup')}
          </p>
          <p className="font-normal text-[#B9BBBD] text-[16px]">
            {t('Enable to start Private VPN when your device is turned on')}
          </p>
        </div>
        <Toggle isToggled={isToggled.launch} handleToggle={() => handleToggle('launch')} />
      </div>
      {/* notifications */}
      <div className="flex flex-row justify-between items-center mx-20 mt-14 py-5 border-t border-[#C8C8C83D]">
        <div>
          <p className="font-bold text-[#F5F5F5] text-[20px]">
            {t('Allow notifications')}
          </p>
          <p className="font-normal text-[#B9BBBD] text-[16px]">
            {t('Allow Private VPN to send you important message & alerts on desktop')}
          </p>
        </div>
        <Toggle isToggled={isToggled.notifications} handleToggle={() => handleToggle('notifications')}/>
      </div>
      
      {/* split tunneling */}
      {/* <div className="flex flex-row justify-between items-center mx-20 mt-14 py-5 border-t border-[#C8C8C83D]">
        <div>
          <p className="font-bold text-[#F5F5F5] text-[20px]">
            Split tunneling
            <span className="inline-block ms-4">
              <svg
                width="17"
                height="15"
                viewBox="0 0 13 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.15264 7.6776C0.90552 5.94772 0.658399 4.21789 0.411277 2.48801C0.356474 2.10455 0.761627 1.84301 1.04982 2.0758C1.81975 2.69766 2.58963 3.31948 3.35955 3.94135C3.61305 4.1461 3.97421 4.07946 4.14995 3.79553L6.07286 0.689277C6.27606 0.361021 6.72391 0.361021 6.92712 0.689277L8.85002 3.79553C9.02577 4.07946 9.38692 4.14605 9.64042 3.94135C10.4103 3.31948 11.1802 2.69766 11.9502 2.0758C12.2384 1.84301 12.6435 2.10455 12.5887 2.48801C12.3416 4.21789 12.0945 5.94772 11.8474 7.6776H1.15264Z"
                  fill="#FF9500"
                />
                <path
                  d="M11.2899 10.5569H1.71041C1.40247 10.5569 1.15283 10.2881 1.15283 9.95645V8.63739H11.8476V9.95645C11.8475 10.2881 11.5979 10.5569 11.2899 10.5569Z"
                  fill="#FF9500"
                />
              </svg>
            </span>
          </p>
          <p className="font-normal text-[#B9BBBD] text-[16px]">
            Enable it to auto connect Private VPN when device start
          </p>
        </div>
        <Toggle />
      </div> */}
    </div>
  );
}
