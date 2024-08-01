export default function detectServers(server) {
    let initialServer = server.split('.');
    let changedServer = (initialServer[initialServer.length-1] -5).toString();
    let half = initialServer.filter((x) => initialServer.indexOf(x) !== initialServer.length-1);
    return (half.concat(changedServer)).join(".");
}
