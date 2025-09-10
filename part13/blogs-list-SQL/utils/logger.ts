const info = (...params: any) => {
  console.log('INFO:', ...params)
}

const error = (...params: any) => {
  console.error('ERROR:', ...params)
}

export default { info, error }
