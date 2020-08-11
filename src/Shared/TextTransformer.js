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

export const RomawiFormat = (num) => {
  if (isNaN(num))
      return NaN;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

export default []