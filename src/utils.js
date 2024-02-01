import { jwtDecode } from "jwt-decode";


// expiration time of token
export const expirationTime = (token, isDate=true) => {
    /* 
        isDate=true -> returns to data format by convertTimestampToDate
        isDate=false -> returns to timestamp format
        not valid token -> returns to current time
    */
    const currentTime = Date.now() / 1000;
    const tokenValue = localStorage.getItem(token);
    const expirationTime = tokenValue ? jwtDecode(tokenValue).exp : currentTime;
    const format = isDate ? convertTimestampToDate(expirationTime,'unix') : expirationTime;
    
    return format;
}

// convert different types of timestamps to formatted date
export const convertTimestampToDate = (timestamp, type) => {
    const adjustedTimestamp = type === 'unix' ? timestamp * 1000 : timestamp;  // unix, iso ...
    const date = new Date(adjustedTimestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const timeString = `${year}.${month}.${day}. ${date.toTimeString().split(' ')[0]}`; // Combine date and time strings
    return timeString;
}