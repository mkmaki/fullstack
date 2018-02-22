const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.message
  default:
    return state
  }
}
export const notify = (message) => {
  return {
    type: 'NOTIFICATION',
    message
  }
}
export default notificationReducer

