const mixedToDecimal = str => {
  const split = str.split(' ')

  return split.reduce((prev, curr) => eval(prev) + eval(curr), 0)
}

export const calcServings = (ingredients, originalServings, newServings) => {
  const fractionString = `${newServings} / ${originalServings}`
  const fraction = newServings / originalServings

  const gcd = function (a, b) {
    if (!b) return a

    return gcd(b, a % b)
  }

  return ingredients.map(ingrObj => {
    const list = ingrObj.list.map(ingr => {
      if (ingr.quantity) {
        const denominator = 8

        const res = mixedToDecimal(ingr.quantity) * fraction
        const wholeNum = Math.floor(res)
        let numerator = Math.round((res - wholeNum) * denominator)

        if (numerator === 0) {
          return { ...ingr, quantity: `${wholeNum}` }
        }
        const fractionGCD = gcd(numerator, denominator)
        const quantityFraction =
          fractionGCD !== 1
            ? `${numerator / fractionGCD}/${denominator / fractionGCD}`
            : `${numerator}/${denominator}`
        return { ...ingr, quantity: `${wholeNum} ${quantityFraction}` }
      }
      return { ...ingr }
    })
    return { ...ingrObj, list }
  })

  // return fractionString
}
