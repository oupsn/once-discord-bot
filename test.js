import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc)
dayjs.extend(timezone)
//dayjs.tz.setDefault('Asia/Bangkok');
const nowInBangkok = dayjs();
//console.log(nowInBangkok.format()); // Output will be in Bangkok time (GMT+07:00)
console.log(dayjs("2013-11-18 11:55:20").tz("Asia/Tokyo"));
console.log(dayjs("2013-11-18 11:55:20").tz("Asia/Bangkok"));
console.log(dayjs("2013-11-18 11:55:20").tz("America/Toronto"));
console.log(dayjs().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss"));