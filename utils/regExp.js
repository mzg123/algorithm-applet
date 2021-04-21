function cardFormat(card, step=4, join=' ') {
  if (!card) return ''
  const reg = new RegExp(`(.{${step}})`, 'g');
  return card.replace(reg,`$1${join}`)
}

export {
  cardFormat
}