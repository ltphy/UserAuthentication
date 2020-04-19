//"username=John Doe";
const getCookie = (cname: string) => {
    const name = cname + "=";
    //get cookies list
    const decodedCookie = decodeURIComponent(document.cookie);
    //split document cookie
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1); //get the rest of string still different from ' '
        }
        if (c.indexOf(name) == 0) { //find the first key name in the array
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

const setCookie = (key: string, value: string, exdays: number) => {
    const date = new Date();
    //Sets the milliseconds value in the Date object using local time.
    date.setTime(date.getTime() + (exdays * 1000 * 60 * 60 * 24));
    console.log("EXPIRES", date.toUTCString());
    date.setDate(date.getTime() + (exdays));
    console.log("EXPIRES", date.toUTCString());
    const expires = "expires=" + date.toUTCString();

    document.cookie = key + "=" + value + ";" + expires + ";path=/";
};
const deleteCookie = (cname?: string) => {
    if (!document.cookie) {
        document.cookie = 'path=/;';
    } else {
        //delete on cookie
        const epochTime = new Date(0);
        if (cname) {
            const name = cname + "=;";
            document.cookie = name + "expires=" + epochTime.toUTCString() + ";path=/";
        } else {

        }

    }

};


export default {
    getCookie,
    setCookie,
    deleteCookie,
}
