import { useContext } from "react";
import { activeTabContext } from "../context/contextDefine";


export default function ConnectBtn() {
  const { servers, activeServer } = useContext(activeTabContext);

  let rawSelectedServer = servers ? servers.servers.map((server) => {return server.list}).flat().find(x=> x.id === activeServer) : undefined;

  let formattedName = `${rawSelectedServer && rawSelectedServer.country_name.replace(
    /\s+/g,
    "-"
  )}-${rawSelectedServer && rawSelectedServer.city_name.replace(/\s+/g, "-")}.ovpn`;

  function connectToVPN() {
    const electron = window.electronAPI;
    const configPath_dev = `${formattedName}`;
    // const configPath_live= "/app/public/servers/Canada2.ovpn";
    console.log(rawSelectedServer);
    console.log("configPath_dev:: ", configPath_dev);
    electron.send("connect-vpn", configPath_dev);
  }

  function disconnectToVPN() {
    const electron = window.electronAPI;
    const configPath_dev = `${formattedName}`;
    electron && electron.send("disconnect-vpn", configPath_dev);
  }
  return (
    <>
      <button
        className="block border bg-green-500 px-5 py-1 rounded-md"
        onClick={connectToVPN}
      >
        connect to vpn
      </button>
      <button
        className="block border bg-yellow-500 mt-2 px-5 py-1 rounded-md"
        onClick={disconnectToVPN}
      >
        disconnect
      </button>
    </>
  );
}
