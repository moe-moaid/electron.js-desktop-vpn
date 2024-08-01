import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="mx-20">
      <p className="font-semibold text-[#F5F5F5] text-[24px] mt-10 mb-5">
        {t('About Private VPN')}
      </p>
      <p className="font-normal text-[#B9BBBD] text-[20px] text-justify">
        {t('Welcome to Private VPN, where your online privacy is our top priority! Dive into a world where your internet experience is both safe and super speedy. With just a tap, you can connect to our global servers, making annoying restrictions and snooping eyes a thing of the past. It\'s all about giving you the freedom to browse, stream, and work securely—anytime, anywhere. With Private VPN, staying private is as easy as pie. Ready to make the internet yours again?')}
      </p>
      <div className="flex flex-row justify-between items-center w-[50%] lg:w-[40%] mt-10">
        <a className="text-[#F0A927] underline" href="https:www.google.com">{t('Privacy Policy')}</a>
        <a className="text-[#F0A927] underline" href="https:www.google.com">{t('Terms & conditions')}</a>
      </div>
    </div>
  );
}
