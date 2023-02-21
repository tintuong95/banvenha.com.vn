

export const getHostName=()=>{
    const {host,protocol} = window.location;
    return protocol+"://" + host;
}