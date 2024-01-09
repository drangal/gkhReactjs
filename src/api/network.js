import { setApplicationList } from '../slices/applicationsSlice'

const LocalAuthServerAdress = 'http://26.65.125.199:8000'
const GlobalAuthServerAdress = 'https://enotgpt-authserver.serveo.net'
const LocalMainServerAdress = 'http://26.65.125.199:8001'
const GlobalMainServerAdress = 'https://enotgpt-mainserver.serveo.net'
const LocalFileServerAdress = 'http://26.65.125.199:8002'
const GlobalFileServerAdress = 'https://enotgpt-fileserver.serveo.net'

const AuthServerCreateCodeDispatcher = '/auth/create_code_dispatcher'
const AuthServerGetTokenDispatcher = '/auth/get_token_dispatcher'
const MainServerGetAllDispatcherInvocations =
  '/dispatchers/getAllDispatcherInvocations'

export const getAllDispatcherInvocations = async (dispatch) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress + MainServerGetAllDispatcherInvocations,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        }
      }
    )
    if (response.ok) {
      const json = await response.json()
      dispatch(setApplicationList(json.invocations))
    } else {
      console.log('WRONG DATA')
    }
  } catch (error) {
    console.log('Ошибки сети или чё-то такое')
  }
}

export const getCodeByPhone = async (setPhoneNumber, onIsContinuedChange) => {
  try {
    const response = await fetch(
      GlobalAuthServerAdress + AuthServerCreateCodeDispatcher,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          number: document.getElementById('phone-number').value
        })
      }
    )

    if (response.ok) {
      setPhoneNumber(document.getElementById('phone-number').value)
      onIsContinuedChange()
    } else {
      console.log(response.statusText)
    }
  } catch (error) {
    console.log('Ошибки сети или чё-то такое')
  }
}

export const getDispatcherToken = async (
  phoneNumber,
  inputTextValue,
  setInputError,
  navigate
) => {
  try {
    const response = await fetch(
      GlobalAuthServerAdress + AuthServerGetTokenDispatcher,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          number: phoneNumber,
          code: +inputTextValue
        })
      }
    )

    if (response.ok) {
      const json = await response.json()
      sessionStorage.setItem('access_token', json.access_token)
      navigate('/')
    } else {
      setInputError(true)
      console.log(response.statusText)
    }
  } catch (error) {
    console.log('Ошибки сети или чё-то такое')
  }
}
