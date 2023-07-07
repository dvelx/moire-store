// приведение числа к более читабельному виду

export default function numberFormat(value) {
  return new Intl.NumberFormat().format(value)
}
