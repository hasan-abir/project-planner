export const formatDate = (timestamp) => {
  const dateObj = timestamp.toDate()

  const day = dateObj.getDate()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month = months[dateObj.getMonth()]
  const year = dateObj.getFullYear()

  return `${day}, ${month}, ${year}`
}
