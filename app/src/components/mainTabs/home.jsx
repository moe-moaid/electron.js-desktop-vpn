import React, { useContext, useEffect, useState } from "react";
import { activeTabContext } from "../../context/contextDefine";
import SingleServer from "../singleServer";
import Lottie from "react-lottie";
import connectingJson from "../../animation/connecting.json";
import notConnectedJson from "../../animation/notConnected";
import ConnectedJson from "../../animation/Connected";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const { servers, activeServer, isConnected, setIsConnected } =
    useContext(activeTabContext);
  // const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [isLoading, setIsLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [cat, setCat] = useState("all");

  const connectedAnime = {
    loop: true,
    autoplay: true,
    animationData: ConnectedJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  const connectingAnime = {
    loop: true,
    autoplay: true,
    animationData: connectingJson,
    rendererSettings: {
  preserveAspectRatio: "xMidYMid slice",
},
  };

  const defaultAnime = {
    loop: true,
    autoplay: true,
    animationData: notConnectedJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Get the entire server object
  let rawSelectedServer = servers
    ? servers.servers
        .map((server) => {
          return server.list;
        })
        .flat()
        .find((x) => x.id === activeServer)
    : undefined;

  // Format the server's name to match the file's name
  let formattedName = `${
    rawSelectedServer?.country_name?.replace(/\s+/g, "-") || ""}-${rawSelectedServer?.city_name?.replace(/\s+/g, "-") || ""}.ovpn`;

  function connectHandler() {
    const electron = window.electronAPI;
    const configPath_dev = `${formattedName}`;
    setIsLoading(true);
    electron.send("connect-vpn", configPath_dev);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  function disconnectHandler() {
    const electron = window.electronAPI;
    const configPath_dev = `${formattedName}`;
    setIsLoading(true);
    electron.send("disconnect-vpn", configPath_dev);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setIsConnected(false);
  }

  useEffect(() => {
    const handleStatus = (status) => {
      console.log(`Received connection status: ${status}`);
      setIsConnected(status);
    };

    window.electronAPI.receive("connection-status", handleStatus);

    return () => {
      window.electronAPI.removeListener("connection-status", handleStatus);
    };
  }, []);

  function handleSearch(e) {
    console.log("inside search box");
    setSearchVal(e);
    console.log(searchVal);
  }

  return (
    <div className="flex flex-row">
      <div className="w-[50%] lg:w-[40%] h-screen bg-darkblue py-5 ps-5">
        <div className="flex flex-row justify-between pe-5">
          <div className="flex flex-row justify-between items-center rounded-lg py-2 px-1 mx-1">
            <input
              className="bg-transparent stroke-none outline-none text-[#ACADB1]"
              type="text"
              placeholder={t('search here...')}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              value={searchVal}
            />
            <svg
              width="26"
              height="28"
              viewBox="0 0 26 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.2382 23.7036C17.8217 23.7036 22.348 18.9137 22.348 13.0051C22.348 7.09651 17.8217 2.30664 12.2382 2.30664C6.65473 2.30664 2.12842 7.09651 2.12842 13.0051C2.12842 18.9137 6.65473 23.7036 12.2382 23.7036Z"
                stroke="#ACADB1"
                strokeWidth="1.68923"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.4121 24.8299L21.2837 22.5776"
                stroke="#ACADB1"
                strokeWidth="1.68923"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* refresh */}
          <div
            className="border p-2 rounded-lg border-[#48516B] hover:cursor-pointer"
            onClick={() => setSearchVal("")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.19509 14.5039C2.45386 14.5039 2.71004 14.3883 2.87911 14.1675L3.25433 13.6802C3.53644 15.3465 4.26151 16.9062 5.35356 18.196C6.44561 19.4858 7.86444 20.4581 9.4614 21.0112C11.4362 21.6999 13.5842 21.7114 15.5662 21.0438C17.5483 20.3762 19.2517 19.0676 20.4075 17.3245C20.5339 17.1337 20.5793 16.9005 20.5337 16.6763C20.4882 16.452 20.3554 16.255 20.1646 16.1286C19.9738 16.0022 19.7407 15.9568 19.5164 16.0023C19.2921 16.0478 19.0951 16.1806 18.9687 16.3714C18.0246 17.795 16.6333 18.8637 15.0143 19.4088C13.3954 19.954 11.641 19.9444 10.0281 19.3818C8.69854 18.9209 7.52081 18.1043 6.62306 17.0207C5.72531 15.9371 5.14191 14.628 4.93635 13.2359L5.67471 13.8044C5.85601 13.9439 6.08532 14.0057 6.31219 13.9762C6.53906 13.9467 6.74492 13.8282 6.88447 13.6469C7.02402 13.4657 7.08583 13.2363 7.05631 13.0095C7.02678 12.7826 6.90835 12.5767 6.72705 12.4372L4.68189 10.863C4.25319 10.5326 3.64335 10.3472 3.25519 10.8535L1.51279 13.116C1.41449 13.2435 1.35386 13.396 1.3378 13.5562C1.32173 13.7164 1.35086 13.8779 1.42189 14.0224C1.49292 14.1669 1.603 14.2885 1.73966 14.3737C1.87632 14.4588 2.03409 14.5039 2.19509 14.5039ZM4.92944 8.07343C5.32537 8.33652 5.86102 8.22783 6.12583 7.83105C7.07046 6.40798 8.4618 5.33973 10.0806 4.79467C11.6993 4.24962 13.4534 4.25877 15.0664 4.82067C16.396 5.28152 17.5737 6.09817 18.4715 7.18177C19.3692 8.26537 19.9526 9.57442 20.1582 10.9665L19.4198 10.3981C19.33 10.329 19.2275 10.2782 19.1182 10.2487C19.0088 10.2193 18.8947 10.2116 18.7823 10.2262C18.67 10.2408 18.5616 10.2774 18.4634 10.3339C18.3653 10.3904 18.2792 10.4657 18.2101 10.5555C18.141 10.6453 18.0902 10.7478 18.0607 10.8571C18.0312 10.9665 18.0236 11.0806 18.0382 11.193C18.0528 11.3053 18.0894 11.4137 18.1459 11.5119C18.2024 11.61 18.2777 11.6961 18.3675 11.7652L20.4126 13.3394C20.8491 13.675 21.4451 13.863 21.8393 13.3489L23.5817 11.0864C23.6508 10.9967 23.7015 10.8943 23.7309 10.7849C23.7604 10.6756 23.768 10.5616 23.7534 10.4494C23.7388 10.3371 23.7022 10.2288 23.6457 10.1307C23.5893 10.0326 23.514 9.94655 23.4243 9.8775C23.3346 9.80846 23.2322 9.75777 23.1229 9.72832C23.0135 9.69886 22.8995 9.69123 22.7873 9.70584C22.675 9.72046 22.5667 9.75705 22.4686 9.81351C22.3705 9.86997 22.2845 9.94521 22.2154 10.0349L21.8402 10.5223C21.5581 8.85598 20.833 7.29623 19.741 6.00644C18.6489 4.71665 17.2301 3.7443 15.6331 3.19127C13.6583 2.50309 11.5107 2.49178 9.52873 3.15914C7.54681 3.8265 5.84339 5.13455 4.68706 6.87704C4.56085 7.06793 4.5155 7.30107 4.56093 7.52534C4.60637 7.74962 4.73889 7.94672 4.92944 8.07343Z"
                fill="#F5F5F5"
              />
            </svg>
          </div>
        </div>

        {/* servers */}
        <div className="flex flex-row justify-start items-center mt-8 px-1 mx-1 space-x-4">
          <button
            className={` ${
              cat === "all"
                ? "text-[#FFFFFF] border-b-2 border-[#F0A927]"
                : "text-[#FFFFFF85]"
            } px-1 text-[18px] hover:border-b-2 hover:border-[#F0A927] hover:text-[#FFFFFF]`}
            onClick={() => {
              setCat("all");
            }}
          >
            {t('All')}
          </button>

          <button
            className={`flex flex-row items-center space-x-2 ${
              cat === "videos"
                ? "text-[#FFFFFF] border-b-2 border-[#F0A927]"
                : "text-[#FFFFFF85]"
            } px-1 text-[18px] hover:border-b-2 hover:border-[#F0A927] hover:text-[#FFFFFF]`}
            onClick={() => {
              setCat("videos");
            }}
          >
            <span>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2189 20.4377C15.8626 20.4377 20.4377 15.8626 20.4377 10.2189C20.4377 4.57514 15.8626 0 10.2189 0C4.57514 0 0 4.57514 0 10.2189C0 15.8626 4.57514 20.4377 10.2189 20.4377Z"
                  fill="#F24646"
                />
                <path
                  d="M8.0476 14.8183L15.2662 10.6506C15.3419 10.6068 15.4047 10.5439 15.4484 10.4682C15.4921 10.3924 15.5151 10.3065 15.5151 10.2191C15.5151 10.1317 15.4921 10.0458 15.4484 9.97007C15.4047 9.89434 15.3419 9.83143 15.2662 9.78765L8.0476 5.61949C7.97178 5.57608 7.88591 5.55332 7.79854 5.55347C7.71118 5.55362 7.62539 5.57667 7.54972 5.62033C7.47404 5.66399 7.41115 5.72673 7.36729 5.80229C7.32344 5.87785 7.30017 5.96359 7.2998 6.05095V14.3866C7.30013 14.474 7.32338 14.5597 7.36721 14.6353C7.41105 14.7109 7.47394 14.7737 7.54962 14.8174C7.62529 14.8611 7.71111 14.8842 7.79849 14.8843C7.88587 14.8845 7.97176 14.8617 8.0476 14.8183Z"
                  fill="#FFFCEE"
                />
              </svg>
            </span>
            <p>{t('Videos')}</p>
          </button>

          <button
            className={`flex flex-row items-center space-x-2 ${
              cat === "games"
                ? "text-[#FFFFFF] border-b-2 border-[#F0A927]"
                : "text-[#FFFFFF85]"
            } px-1 text-[18px] hover:border-b-2 hover:border-[#F0A927] hover:text-[#FFFFFF]`}
            onClick={() => {
              setCat("games");
            }}
          >
            <span>
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.9201 14.07C21.4778 14.7603 20.7986 15.2653 20.0101 15.49C18.3601 15.93 16.5101 14.97 15.0801 12.91C14.8336 12.5517 14.5035 12.2589 14.1185 12.0567C13.7334 11.8546 13.3049 11.7493 12.8701 11.75H11.1301C10.6424 11.7465 10.1638 11.8818 9.75006 12.14C9.41907 12.331 9.13538 12.5942 8.92006 12.91C8.77732 13.1211 8.62379 13.3247 8.46006 13.52C8.45006 13.53 8.45006 13.54 8.44006 13.54C8.01963 14.1265 7.47593 14.614 6.84712 14.9681C6.21831 15.3223 5.51961 15.5345 4.80006 15.59C4.52691 15.5912 4.2547 15.5576 3.99006 15.49C1.42006 14.8 0.29006 10.97 1.41006 6.76996C1.88823 4.72584 2.98463 2.8787 4.55006 1.47995C5.00762 1.05404 5.56043 0.743763 6.16233 0.575021C6.76424 0.406279 7.39778 0.383969 8.01006 0.509954C8.53901 0.654142 9.02143 0.933256 9.41006 1.31995C9.94644 1.87896 10.6763 2.21168 11.4501 2.24995H12.5501C13.3238 2.21158 14.0536 1.87887 14.5901 1.31995C14.9786 0.933183 15.4611 0.654057 15.9901 0.509954C18.5701 -0.180046 21.4601 2.56995 22.5901 6.76996C23.3701 9.68996 23.0601 12.44 21.9201 14.07Z"
                  fill="#36EA94"
                />
                <path
                  d="M21.9201 14.07C21.6423 14.2598 21.3347 14.4017 21.0101 14.49C19.3601 14.93 17.5101 13.97 16.0801 11.91C15.8336 11.5517 15.5035 11.2589 15.1185 11.0567C14.7334 10.8546 14.3049 10.7493 13.8701 10.75H12.1301C11.6952 10.7493 11.2667 10.8546 10.8817 11.0567C10.4966 11.2589 10.1666 11.5517 9.92006 11.91C9.86918 11.9907 9.81236 12.0676 9.75006 12.14C9.41907 12.331 9.13538 12.5942 8.92006 12.91C8.77732 13.1211 8.62378 13.3247 8.46006 13.52C8.45006 13.53 8.45006 13.54 8.44006 13.54C7.7073 14.1836 6.77475 14.5545 5.80006 14.59C5.52691 14.5912 5.2547 14.5576 4.99006 14.49C2.42006 13.8 1.29006 9.96995 2.41006 5.76995C2.80389 4.2017 3.5341 2.73787 4.55006 1.47995C5.00762 1.05404 5.56043 0.743763 6.16233 0.575021C6.76424 0.406279 7.39778 0.383969 8.01006 0.509954C8.53901 0.654142 9.02142 0.933256 9.41006 1.31995C9.94644 1.87896 10.6763 2.21168 11.4501 2.24995H12.5501C13.3238 2.21158 14.0536 1.87887 14.5901 1.31995C14.9786 0.933183 15.4611 0.654057 15.9901 0.509954C18.5701 -0.180046 21.4601 2.56995 22.5901 6.76995C23.3701 9.68995 23.0601 12.44 21.9201 14.07Z"
                  fill="#4DBA79"
                />
                <path
                  d="M7 9.75C6.80109 9.75 6.61032 9.67098 6.46967 9.53033C6.32902 9.38968 6.25 9.19891 6.25 9V6C6.25 5.80109 6.32902 5.61032 6.46967 5.46967C6.61032 5.32902 6.80109 5.25 7 5.25C7.19891 5.25 7.38968 5.32902 7.53033 5.46967C7.67098 5.61032 7.75 5.80109 7.75 6V9C7.75 9.19891 7.67098 9.38968 7.53033 9.53033C7.38968 9.67098 7.19891 9.75 7 9.75Z"
                  fill="white"
                />
                <path
                  d="M8.5 8.25H5.5C5.30109 8.25 5.11032 8.17098 4.96967 8.03033C4.82902 7.88968 4.75 7.69891 4.75 7.5C4.75 7.30109 4.82902 7.11032 4.96967 6.96967C5.11032 6.82902 5.30109 6.75 5.5 6.75H8.5C8.69891 6.75 8.88968 6.82902 9.03033 6.96967C9.17098 7.11032 9.25 7.30109 9.25 7.5C9.25 7.69891 9.17098 7.88968 9.03033 8.03033C8.88968 8.17098 8.69891 8.25 8.5 8.25Z"
                  fill="white"
                />
                <path
                  d="M15.75 7.5C16.4404 7.5 17 6.94036 17 6.25C17 5.55964 16.4404 5 15.75 5C15.0596 5 14.5 5.55964 14.5 6.25C14.5 6.94036 15.0596 7.5 15.75 7.5Z"
                  fill="white"
                />
                <path
                  d="M18.25 10C18.9404 10 19.5 9.44036 19.5 8.75C19.5 8.05964 18.9404 7.5 18.25 7.5C17.5596 7.5 17 8.05964 17 8.75C17 9.44036 17.5596 10 18.25 10Z"
                  fill="white"
                />
              </svg>
            </span>
            <p>{t('Games')}</p>
          </button>
        </div>
        <div className="flex flex-row justify-start items-center mt-8 px-1 mx-1">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
              fill="white"
              fillOpacity="0.12"
            />
            <path
              d="M12.267 16.0001C12.1337 17.3334 12.0003 18.6667 12.0003 20.0001C12.0003 21.3334 12.1337 22.6667 12.267 24.0001H7.33366C6.93366 22.6667 6.66699 21.3334 6.66699 20.0001C6.66699 18.6667 6.93366 17.3334 7.33366 16.0001H12.267ZM25.067 16.0001C25.2003 17.2001 25.3337 18.6667 25.3337 20.0001C25.3337 21.3334 25.2003 22.8001 25.067 24.0001H14.9337C14.8003 22.8001 14.667 21.3334 14.667 20.0001C14.667 18.6667 14.8003 17.2001 14.9337 16.0001H25.067ZM33.3337 20.0001C33.3337 21.3334 33.067 22.6667 32.667 24.0001H27.7337C27.867 22.6667 28.0003 21.3334 28.0003 20.0001C28.0003 18.6667 27.867 17.3334 27.7337 16.0001H32.667C33.067 17.3334 33.3337 18.6667 33.3337 20.0001ZM14.8003 7.73341C13.867 9.20008 13.2003 11.0667 12.667 13.3334H8.40033C9.86699 10.8001 12.1337 8.93341 14.8003 7.73341ZM24.5337 13.3334H15.467C16.4003 9.46675 18.1337 6.93341 19.7337 6.66675C19.867 6.66675 19.867 6.66675 20.0003 6.66675C20.1337 6.66675 20.1337 6.66675 20.267 6.66675C21.867 6.93341 23.6003 9.46675 24.5337 13.3334ZM31.6003 13.3334H27.3337C26.8003 11.0667 26.1337 9.20008 25.2003 7.73341C27.867 8.93341 30.1337 10.8001 31.6003 13.3334ZM12.667 26.6667C13.2003 28.9334 13.867 30.8001 14.8003 32.2668C12.1337 31.0667 10.0003 29.2001 8.53366 26.6667H12.667ZM15.467 26.6667H24.5337C23.6003 30.5334 21.867 33.0667 20.267 33.3334C20.1337 33.3334 20.1337 33.3334 20.0003 33.3334C19.867 33.3334 19.867 33.3334 19.7337 33.3334C18.1337 33.0667 16.4003 30.5334 15.467 26.6667ZM31.6003 26.6667C30.1337 29.2001 28.0003 31.0667 25.3337 32.2668C26.267 30.8001 26.9337 28.9334 27.467 26.6667H31.6003Z"
              fill="white"
            />
          </svg>
          <p className="text-[#F5F5F5] font-semibold text-[20px] ms-4">
            {t('Auto detect server')}
          </p>
        </div>
        <div className="h-[70vh] overflow-y-scroll pe-5">
          {/* Show Free Servers game, stream, all*/}
          {!searchVal &&
            servers &&
            servers.servers &&
            servers?.servers[0].list.map((server, index) => (
              <div key={index} className="mt-4 text-white">
                {
                    cat === "games"
                      ? server.server_type === "Game" &&
                        server.type === "free" && (
                          <div key={index} className="mt-2">
                            <SingleServer
                              id={server.id}
                              country={server.country_name}
                              city={server.city_name}
                              type={server.type}
                              flag={server.flag}
                            />
                          </div>
                        )
                      : cat === "videos"
                      ? server.server_type === "Stream" &&
                        server.type === "free" && (
                          <div key={index} className="mt-2">
                            <SingleServer
                              id={server.id}
                              country={server.country_name}
                              city={server.city_name}
                              type={server.type}
                              flag={server.flag}
                            />
                          </div>
                        )
                      : server.type === "free" && (
                          <div key={index} className="mt-2">
                            <SingleServer
                              id={server.id}
                              country={server.country_name}
                              city={server.city_name}
                              type={server.type}
                              flag={server.flag}
                            />
                          </div>
                        )
                  }
              </div>
            ))}

          {/* Show Premium Servers */}
          {!searchVal &&
            servers &&
            servers.servers &&
            servers?.servers[0].list.map((server, index) => (
              <div key={index} className="mt-4 text-white">
                {
                    cat === "games"
                      ? server.server_type === "Game" &&
                        server.type === "premium" && (
                          <div key={index} className="mt-2">
                            <SingleServer
                              id={server.id}
                              country={server.country_name}
                              city={server.city_name}
                              type={server.type}
                              flag={server.flag}
                            />
                          </div>
                        )
                      : cat === "videos"
                      ? server.server_type === "Stream" &&
                        server.type === "premium" && (
                          <div key={index} className="mt-2">
                            <SingleServer
                              id={server.id}
                              country={server.country_name}
                              city={server.city_name}
                              type={server.type}
                              flag={server.flag}
                            />
                          </div>
                        )
                      : server.type === "premium" && (
                          <div key={index} className="mt-2">
                            <SingleServer
                              id={server.id}
                              country={server.country_name}
                              city={server.city_name}
                              type={server.type}
                              flag={server.flag}
                            />
                          </div>
                        )
                  }
              </div>
            ))}

          {/* Show Search Result */}
          {searchVal &&
            servers &&
            servers.servers &&
            servers?.servers[0].list.map((server, index) => (
              <div key={index} className="mt-4 text-white">
                {
                      server.country_name
                        .toLowerCase()
                        .includes(searchVal && searchVal.toLowerCase()) && (
                        <div key={index} className="mt-2">
                          <SingleServer
                            id={server.id}
                            country={server.country_name}
                            city={server.city_name}
                            type={server.type}
                            flag={server.flag}
                          />
                          {/* Render more server details as needed */}
                        </div>
                      )
                  }
              </div>
            ))}
        </div>
      </div>
      <div
        className={`relative w-[50%] lg:w-[60%] bg-darkblue border-s border-[#4D5C82CF] svg-background`}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <p className="text-[#B9BBBD] font-normal text-[20px] mb-2">{t('status')}</p>
          {!isConnected && !isLoading && (
            <>
              <p className="text-[#F5F5F5] font-bold text-[16px] mb-5">
                {t('Not Connected')}
              </p>
              <button onClick={connectHandler}>
                <Lottie options={defaultAnime} />
              </button>
              <p className="text-white font-medium text-[16px] mt-5">
                {t('Tap to Connect')}
              </p>
            </>
          )}
          {isLoading && (
            <>
              <p className="text-[#F0A927] font-bold text-[16px] mb-5">
                {t('connecting')}...
              </p>
              <button disabled={true}>
                <Lottie options={connectingAnime} />
              </button>
            </>
          )}
          {isConnected && !isLoading && (
            <>
              <p className="text-[#00CF6E] font-bold text-[16px] mb-5">
                {t('Connected')}
              </p>
              <button onClick={disconnectHandler}>
                <Lottie options={connectedAnime} />
              </button>
              <p className="text-white font-medium text-[16px] mt-5">
                {t('Tap to disonnect')}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
