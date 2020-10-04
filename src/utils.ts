import React from 'react'
import {Action, Pokemon, ReducerState} from './typings'

function useSafeDispatch(dispatch: Function) {
  const mounted = React.useRef(false)

  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}

function asyncReducer(_state: ReducerState, action: Action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(initialState?: ReducerState | any) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer as any, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const {data, error, status} = state as ReducerState

  const run = React.useCallback(
    promise => {
      dispatch({type: 'pending'})
      promise.then(
        (data: Pokemon) => {
          dispatch({type: 'resolved', data})
        },
        (error: Error) => {
          dispatch({type: 'rejected', error})
        },
      )
    },
    [dispatch],
  )

  const setData = React.useCallback(
    data => dispatch({type: 'resolved', data}),
    [dispatch],
  )
  const setError = React.useCallback(
    error => dispatch({type: 'rejected', error}),
    [dispatch],
  )

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  }
}

export {useAsync}
