export const formatInt = (x) => new Number(x).toLocaleString('en-GB', {
  maximumFractionDigits: 0
})

export const formatDec = (x) => new Number(x).toLocaleString('en-GB', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export const formatPerc = (x) => `${formatDec(x*100)}%`
