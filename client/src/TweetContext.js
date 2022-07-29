import { createContext, useReducer, useEffect } from "react";

export const TweetContext = createContext(null);

const initialTweetState = {
    profileInfo: null,
    tweetInfo: null,
    userFeed: null
}

const reducer = (state, action) => {
    switch(action.type){
        case 'store-profile-info': {
            return {
                ...state,
                profileInfo: action.profileInfo
            }
        }
        case 'store-tweet-details' : {
            return {
                ...state,
                tweetInfo: action.tweetInfo
            }
        }
        case 'store-user-feed' : {
            return {
                ...state,
                userFeed: action.userFeed
            }
        }
        default:
            throw new Error('ERROR ERROR ERROR ERROR')
    }
}

export const TweetContextProvider = ({children}) => {
    const [state, dispatchTweet] = useReducer(reducer, initialTweetState)

    return (
        <TweetContext.Provider value={{
            ...state,
            dispatchTweet
        }}>
            {children}
        </TweetContext.Provider>
    )
}
