import { formatDistanceToNow, format, parseISO } from 'date-fns'

function formatTime(timestamp) {
  const postDate = parseISO(timestamp)

  const distanceToNow = formatDistanceToNow(postDate)

  if (distanceToNow.includes('day')) {
    // Nếu cách đây 2 ngày trở xuống, hiển thị '2d ago'
    return `${distanceToNow} ago`
  } else if (distanceToNow.includes('hour')) {
    // Nếu cách đây 2 giờ trở xuống, hiển thị '2h ago'
    return `${distanceToNow} ago`
  } else {
    // Ngược lại, hiển thị theo định dạng 'ngày/tháng'
    return format(postDate, 'dd/MM')
  }
}

export default formatTime
