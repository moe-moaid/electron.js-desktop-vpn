import React from "react";
import Toggle from "../toggle";
import { useTranslation } from "react-i18next";

export default function Protocol() {
  const { t } = useTranslation();
  return (
    <div>
      {/* Auto Protocol */}
      <div className="flex flex-row justify-between items-center mx-20 mt-14 py-5 border-t border-[#C8C8C83D]">
        <div>
          <div className="flex flex-row items-center space-x-4">
          <p className="font-bold text-[#F5F5F5] text-[20px]">{t('Auto')}</p>
          <p className="font-bold text-[#101729] text-[14px] bg-[#F0A927] px-5 py-2 rounded-lg">{t('Coming Soon')}</p>
          </div>
          <p className="font-normal text-[#B9BBBD] text-[16px]">
            {t('Optimizes your connection whith the bst protocol for speed and seurity.')}
          </p>
        </div>
      </div>
      {/* notifications */}
      <div className="flex flex-row justify-between items-center mx-20 mt-14 py-5 border-t border-[#C8C8C83D]">
        <div>
          <div className="flex flex-row items-center space-x-4">
          <p className="font-bold text-[#F5F5F5] text-[20px]">{t('Open VPN')}</p>
          <p className="font-bold text-[#101729] text-[14px] bg-[#F0A927] px-5 py-2 rounded-lg">{t('Coming Soon')}</p>
          </div>
          <p className="font-normal text-[#B9BBBD] text-[16px]">
            {t('Secure, flexible, and open-source for reliable protection.')}
          </p>
        </div>
      </div>
      {/* Auto Connect */}
      <div className="flex flex-row justify-between items-center mx-20 mt-14 py-5 border-t border-[#C8C8C83D]">
        <div>
          <div className="flex flex-row items-center space-x-4">
          <p className="font-bold text-[#F5F5F5] text-[20px]">
            {t('IPSec/IKEv2')}
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
          <p className="font-bold text-[#101729] text-[14px] bg-[#F0A927] px-5 py-2 rounded-lg">{t('Coming Soon')}</p>
          </div>
          
          <p className="font-normal text-[#B9BBBD] text-[16px]">
            {t('Fast and resillient, perfect for stable mobile connections.')}
          </p>
        </div>
      </div>
    </div>
  );
}
