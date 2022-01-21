const measurementTypes = [
  'drop',
  'drops',
  'dr',
  'drs',
  'smidgen',
  'smidgens',
  'smdg',
  'smdgs',
  'smi',
  'smis',
  'pinch',
  'pinches',
  'pn',
  'pns',
  'dash',
  'dashes',
  'ds',
  'dss',
  'saltspooon',
  'saltspooons',
  'scruple',
  'scruples',
  'ssp',
  'ssps',
  'coffeespoon',
  'coffeespoons',
  'csp',
  'csps',
  'fluiddram',
  'fluiddrams',
  'dram',
  'drams',
  'fldr',
  'fldrs',
  'dr',
  'drs',
  'teaspoon',
  'teaspoons',
  'tsp',
  'tsps',
  'dessertspoon',
  'dessertspoons',
  'dsp',
  'dsps',
  'dssp',
  'dssps',
  'dstspn',
  'dstspns',
  'tablespoon',
  'tablespoons',
  'tbsp',
  'tbsps',
  'tbl',
  'tbls',
  'tbs',
  'tbss',
  'fluidounce',
  'fluidounces',
  'ounce',
  'ounces',
  'floz',
  'flozs',
  'oz',
  'ozs',
  'wineglass',
  'wineglasses',
  'wgf',
  'wgfs',
  'gill',
  'gills',
  'teacup',
  'teacups',
  'tcf',
  'tcfs',
  'cup',
  'cups',
  'C',
  'Cs',
  'pint',
  'pints',
  'quart',
  'pt',
  'pts',
  'qt',
  'qts',
  'pottle',
  'pottles',
  'pot',
  'pots',
  'gallon',
  'gallons',
  'gal',
  'gals',
]

// Takes String, returns boolean based on if given string exists in measurementTypes
const measurementExists = str => {
  const preppedString = str.toLowerCase().split('.').join('')

  const typeExists = measurementTypes.includes(preppedString)

  return typeExists
}

// Takes String, returns boolean based on if given string is a number in fraction form
const isFraction = str => {
  const tempSplit = str.split('/')
  console.log(tempSplit)

  if (tempSplit.length !== 2) {
    return false
  }

  const allValsAreNums = tempSplit.every(
    i => !isNaN(Number(i)) && i.trim() !== ''
  )
  if (!allValsAreNums) {
    return false
  }

  return true
}

const validateQuantityandMeasurements = str => {
  const splitVal = str.split(' ')

  if (splitVal.length <= 1) {
    return { err: 'ERROR, PLEASE ENTER BOTH QUANTITY AND MEASUREMENT' }
  }

  // If first value is not a number or a fraction, then return an error
  if (isNaN(splitVal[0]) && !isFraction(splitVal[0])) {
    return { err: 'ERROR, NO VALUE PROVIDED FOR INGREDIENT' }
  }

  // If first value is a fraction and the second value does not match the quantity types the return error
  const singleNumberQuantityTypeStr = [...splitVal].slice(1).join('')
  if (
    isFraction(splitVal[0]) &&
    !measurementExists(singleNumberQuantityTypeStr)
  ) {
    return {
      err: 'ERROR, PLEASE ENTER CORRECT QUANTITY TYPE IE CUP C TABLESPOON TBS OUNCE OZ',
    }
  }

  // If first value is a number, second number is neither a fraction or a quantity type, return error
  const mixedNumberQuantityTypeStr = [...splitVal].slice(2).join('')
  if (
    !isNaN(splitVal[0]) &&
    !isFraction(splitVal[1]) &&
    !measurementExists(singleNumberQuantityTypeStr)
  ) {
    return { err: 'ERROR, PLEASE ENTER QUANTITY' }
  }
  // If first value is a number, second value is a fraction and final value is not a valid quantity
  else if (
    isFraction(splitVal[1]) &&
    !measurementExists(mixedNumberQuantityTypeStr)
  ) {
    return { err: 'ERROR, PLEASE ENTER VALID QUANTITY TYPE' }
  }

  // If first value is a number and second value is a measurement type,
  // check that number is valid and return data object
  if (!isNaN(splitVal[0]) && measurementExists(singleNumberQuantityTypeStr)) {
    const num = Number(splitVal[0])
    if (num <= 0) {
      return { err: 'ERROR, PLEASE ENTER NUMBER GREATER THAN 0' }
    }
    if (num % 1 !== 0) {
      return {
        err: 'ERROR, PLEASE ENTER MIXED NUMBER RATHER THAN A DECIMAL. IE: 1 1/2',
      }
    }
    return { quantity: num, measurement: singleNumberQuantityTypeStr }
  }
  // If first value is a fraction, convert fraction to decimal and return data object
  if (isFraction(splitVal[0])) {
    const num = eval(splitVal[0])
    return { quantity: num, measurement: singleNumberQuantityTypeStr }
  }

  // If first value is a number and second value is a fraction, convert fraction to decimal
  // check that the number is valid and add the both numbers. return data object
  const wholeNum = Number(splitVal[0])
  const decimalNum = eval(splitVal[1])
  if (wholeNum <= 0) {
    return { err: 'ERROR, PLEASE ENTER NUMBER GREATER THAN 0' }
  }
  if (wholeNum % 1 !== 0) {
    return {
      err: 'ERROR, PLEASE ENTER MIXED NUMBER RATHER THAN A DECIMAL. IE: 1 1/2',
    }
  }
  return {
    quantity: wholeNum + decimalNum,
    measurement: mixedNumberQuantityTypeStr,
  }
}

const validateAdditionalInstructions = str => {
  if (str.length > 50) {
    return {
      err: 'ERROR, PLEASE LIMIT ADDITIONAL INSTRUCTIONS TO 50 OR LESS CHARACTERS',
    }
  }

  return { content: str }
}

export const validateIngredientQuantityStr = str => {
  // split string at comma to get quantity
  // and measurements at index 0 and additional instructions at index 1
  const splitStr = str.split(',')

  const quantityandMeasurements = validateQuantityandMeasurements(splitStr[0])
  if (quantityandMeasurements.err) {
    return quantityandMeasurements.err
  }

  const additionalInstructions = splitStr[1]
    ? validateAdditionalInstructions(splitStr[1])
    : null
  if (additionalInstructions && additionalInstructions.err) {
    return additionalInstructions.err
  }
  console.log(quantityandMeasurements, additionalInstructions)
}
