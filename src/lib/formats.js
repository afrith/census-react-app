export const formatInt = x => x.toLocaleString('en-GB', {
  maximumFractionDigits: 0
})

export const formatDec = x => x.toLocaleString('en-GB', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export const formatPerc = (x) => `${formatDec(x * 100)}%`
