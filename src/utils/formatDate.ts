import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (dateString: string) => {
  const date = dayjs.utc(dateString);
  const japanTime = date.tz("Asia/Tokyo");
  return japanTime.format("YYYY/MM/DD");
};