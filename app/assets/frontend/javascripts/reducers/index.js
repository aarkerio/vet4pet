import appointments_Rdcer from './appointments_Rdcer'


export default function rootReducer(state = {}, action) {
  return {
    appointments_Rdcer: appointments_Rdcer(state.appointments_Rdcer, action)
  }
}
