import { setApplicationList } from '../slices/applicationsSlice'
import { setFreeWorkersList } from '../slices/freeWorkersSlice'
import { setJobsList } from '../slices/jobsSlice'
import { setUserInfo } from '../slices/userInfoSlice'

const LocalAuthServerAdress = 'http://26.65.125.199:8000'
const GlobalAuthServerAdress = 'https://enotgpt-authserver.serveo.net'
const LocalMainServerAdress = 'http://26.65.125.199:8001'
const GlobalMainServerAdress = 'https://enotgpt-mainserver.serveo.net'
const LocalFileServerAdress = 'http://26.65.125.199:8002'
const GlobalFileServerAdress = 'https://enotgpt-fileserver.serveo.net'

const AuthServerCreateCodeDispatcher = '/auth/create_code/dispatcher'
const AuthServerGetTokenDispatcher = '/auth/get_token/dispatcher'
const MainServerGetMyIncomingInvocations =
  '/dispatchers/getMyIncomingInvocations'
const MainServerGetInvocationsByStatus =
  '/dispatchers/getAllMyInvocationsByStatus'
const MainServerGetJobApplicationsByStatus =
  '/dispatchers/getJobApplicationsByStatus'

const MainServerFailureJob = '/dispatchers/failureJob'
const MainServerSuccessJob = '/dispatchers/successJob'
const MainServerGetCancelInvocations = '/dispatchers/getCancelInvocations'
const MainServerGetFreeWorkers = '/dispatchers/getFreeWorkers'
const MainServerAssignAnEmployee = '/dispatchers/assignAnEmployee'
const MainServerCloseInvocation = '/dispatchers/dispatcherCloseInvocation'
const MainServerUsersMe = '/users/me'
const MainServerUsersEdit = '/users/edit'

export const assignAnEmployee = async (invocationId, workerIds) => {
  await workerIds.map(async (workerId) => {
    try {
      const response = await fetch(
        GlobalAuthServerAdress + MainServerAssignAnEmployee,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
          },
          body: JSON.stringify({
            invocation_id: invocationId,
            worker_id: workerId
          })
        }
      )

      if (response.ok) {
        console.log(response.statusText)
      } else {
        console.log(response.statusText)
      }
    } catch (error) {
      console.log('Ошибки сети или чё-то такое')
    }
  })
}

export const failureJob = async (id) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress + MainServerFailureJob + '?application_id=' + id,
      {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        }
      }
    )

    return response.ok
  } catch (error) {
    console.log('Ошибки сети или чё-то такое: ' + error)
    return false
  }
}
export const successJob = async (id) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress + MainServerSuccessJob + '?application_id=' + id,
      {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        }
      }
    )

    return response.ok
  } catch (error) {
    console.log('Ошибки сети или чё-то такое: ' + error)
    return false
  }
}
export const closeInvocation = async (id) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress + MainServerCloseInvocation,
      {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        },
        body: JSON.stringify({
          invocation_id: id,
          comment: document.getElementById('delete-reason').value
        })
      }
    )

    return response.ok
  } catch (error) {
    console.log('Ошибки сети или чё-то такое: ' + error)
    return false
  }
}

export const getFreeWorkers = async (dispatch) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress + MainServerGetFreeWorkers,
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
      dispatch(setFreeWorkersList(json.free_workers))
    } else {
      console.log('WRONG DATA')
    }
  } catch (error) {
    console.log('Ошибки сети или чё-то такое')
  }
}

export const getIncomingDispatcherInvocations = async (dispatch) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress + MainServerGetMyIncomingInvocations,
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
    console.log('Ошибки сети или чё-то такое' + error)
  }
}

export const getAcceptedDispatcherInvocations = async (dispatch) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress + MainServerGetInvocationsByStatus + '?status=1',
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

export const getInWorkDispatcherInvocations = async (dispatch) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress + MainServerGetInvocationsByStatus + '?status=2',
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
export const getCancelInvocations = async (dispatch) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress + MainServerGetCancelInvocations,
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
export const getJobApplicationsByStatus = async (dispatch) => {
  try {
    const response = await fetch(
      GlobalMainServerAdress +
        MainServerGetJobApplicationsByStatus +
        '?status=0',
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
      dispatch(setJobsList(json.jobs))
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

export const getUserInfo = async (dispatch) => {
  try {
    const response = await fetch(GlobalMainServerAdress + MainServerUsersMe, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    })
    if (response.ok) {
      const json = await response.json()
      dispatch(setUserInfo(json.user))
    } else {
      console.log('WRONG DATA')
    }
  } catch (error) {
    console.log('Ошибки сети или чё-то такое')
  }
}

export const setUserEdit = async () => {
  try {
    const response = await fetch(GlobalMainServerAdress + MainServerUsersEdit, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        patronymic: document.getElementById('patronymic').value,
        city: document.getElementById('city').value,
        photo: 'string',
        street: document.getElementById('street').value,
        house: document.getElementById('houseNumber').value,
        apartment_number: document.getElementById('apartmentNumber').value,
        coordinates: [0]
      })
    })
    if (response.ok) {
      console.log(response.ok)
    } else {
      console.log('WRONG DATA')
    }
  } catch (error) {
    console.log('Ошибки сети или чё-то такое')
  }
}
