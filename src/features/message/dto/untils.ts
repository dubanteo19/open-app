import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const formatTime = (timeString: string): string =>{
  const now = dayjs();
  const time = dayjs(timeString);
  const diffInHours = now.diff(time, "hour");
  const diffInDays = now.diff(time, "day");
  const diffInMonths = now.diff(time, "month");
  const diffInYears = now.diff(time, "year");

  if (diffInYears >= 1) {
    // Hơn 1 năm: hiển thị ngày cụ thể
    return time.format("DD/MM/YYYY");
  } else if (diffInMonths >= 1) {
    // Hơn 1 tháng: "1 tháng trước"
    return "1 tháng trước";
  } else if (diffInDays >= 1) {
    // Hơn 1 ngày: "x ngày trước"
    return `${diffInDays} ngày trước`;
  } else if (diffInHours >= 1) {
    // Trong vòng 24h: "x giờ trước"
    return `${diffInHours} giờ trước`;
  } else {
    // Nếu mới chỉ vài phút trước
    const diffInMinutes = now.diff(time, "minute");
    if (diffInMinutes <= 0) return "vừa xong";
    return `${diffInMinutes} phút trước`;
  }
}
