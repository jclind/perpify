export const formatRating = (tot, count) => {
  console.log('HERE', tot, count)
  if (tot === 0 || count === 0) {
    return 'No Ratings'
  }
  const roundedNumber = Math.round((Number(tot) / Number(count)) * 10) / 10

  return roundedNumber.toFixed(1)
}
