import React, { useContext, useEffect } from "react";
import { activeTabContext } from "../context/contextDefine";
import { useTranslation } from "react-i18next";

export default function LoadingComponent() {
  const { loading, progress, setProgress } = useContext(activeTabContext);
  const { t } = useTranslation();
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 500);
      return () => clearInterval(interval);
    }
  });
  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
      {loading ? (
        <div className="flex flex-col items-center">
          <progress
            className="h-2 custom-progress"
            value={Number(progress)}
            max={100}
          />
          <p className="mt-5 font-normal text-[#B9BBBD] text-[20px]">
            {t('Getting things ready for you')}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
