export const filterSetter = (data) => {
  if (data === '')
    return {
      type: 'EMPTY',
    }
  return {
    type: 'SET_FILTER',
    payload: data,
  }
}

const filterReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return ''
  }
}

export default filterReducer
