export const formatRating = (tot, count) => {
  const roundedNumber = Math.round((Number(tot) / Number(count)) * 10) / 10

  return roundedNumber.toFixed(1)
}
