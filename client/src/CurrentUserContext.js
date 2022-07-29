import { createContext, useReducer, useEffect } from "react";

export const CurrentUserContext = createContext(null);

const initialState = {
    currentUser: null,
    status: 'loading',
    currentUserInfo: null,
    homeFeedInfo: null,
    tweetInfo: null
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'data-received': {
            return {
                ...state,
                status: 'idle'
            }
        } case 'set-current-user': {
            return {
                ...state,
                currentUser: action.currentUser
            }
        }
        case 'store-profile-info': {
            return {
                ...state,
                currentUserInfo: action.currentUserInfo
            }
        }
        case 'store-home-feed-info' : {
            return {
                ...state,
                homeFeedInfo: action.homeFeedInfo
            }
        }
        default:
            throw new Error('ERROR ERROR ERROR ERROR')
    }
}

export const CurrentUserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    useEffect(()=>{
        fetch('/api/me/profile')
          .then((res)=>res.json())
          .then((data)=>{
            dispatch({type: 'store-profile-info', currentUserInfo: data.profile})
            dispatch({type:'data-received'})
            dispatch({type: 'set-current-user', currentUser: data.profile.handle})
          })
      }, [])
    

    return (
        <CurrentUserContext.Provider
        value={{
            ...state,
            dispatch
            // action: {
            //     setCurrentUser,
            // },
        }}>
            {children}
        </CurrentUserContext.Provider>
    )
}