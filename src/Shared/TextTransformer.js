export const PinTextFormat = (number) => {
  let out = '0000'
  let temp = number
  if (typeof temp === 'number') temp = temp.toString()
  if ((typeof temp !== 'number') && (typeof temp !== 'string')) return out
  if (temp.length > 4) {
    out = temp
  } else {
    out = out.substr(0, out.length-temp.length) + temp
  }
  return out
}

export const RupiahFormat = (number) => {
  return new Intl.NumberFormat('ID',{ style: 'currency', currency: 'IDR' }).format(number)
}

export default []