import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from './CurrentUserContext';
import { TweetContext } from "./TweetContext";
import styled from "styled-components";
import {COLORS} from './constants';

import { useHistory } from "react-router-dom";
import { DisplayTweets } from "./DisplayTweets";

import { ErrorScreen } from "./ErrorScreen";



export const HomeFeed = () => {
  const {dispatch, homeFeedInfo, currentUserInfo, error} = useContext(CurrentUserContext);
  const {dispatchTweet, profileInfo} = useContext(TweetContext);
  const history = useHistory();
  const [characters, setCharacters] = useState(280);
  const [newUserTweet, setNewUserTweet] = useState(null);
  const [postError, setPostError] = useState(null);
  
  // fetch home feed info
  useEffect(()=>{
    fetch('/api/me/home-feed')
    .then((res=>{
      if(!res.ok) {
        throw Error('An unknown error has occured.')
      }
      return res.json()}))
    .then((data)=>{
      dispatch({type: 'restore-error', error: null})
      dispatch({type: 'store-home-feed-info', homeFeedInfo: data})
    }).catch(err=>{
      dispatch({type: 'store-error', error: err.message})
    })
  }, [])
  // post status - no database so status is not preserved anywhere as of yet
  const postStatus = (e) => {
    if (characters >= 0) {
      e.preventDefault();
      e.target.reset();
      fetch('api/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'status': newUserTweet })
    }).then((res=>{
      if(!res.ok) {
        throw Error('Post error')
      }
      return res.json()}))
    .then((data)=>{
      setPostError(null)
      console.log(data)
    }).catch(err=>{
      setPostError(err.message)
    })
    fetch('/api/me/home-feed')
    .then((res)=>res.json())
    .then((data)=>{
      dispatch({type: 'store-home-feed-info', homeFeedInfo: data})
    })
    setCharacters(280)
    } else {
      e.preventDefault();
      window.alert('Too many characters, please shorten your tweet to post')
    }
  }

  // set state to reflect how many characters are left
  // set second state to the value
  const textAreaLengthFx = (event) => {
    {
     setCharacters(280 - event.target.value.length)
     setNewUserTweet(event.target.value)
   }
 }

if (currentUserInfo) {
  return (
    <>
    <FlexColumn>
    <div>Home</div>
        <Form onSubmit={(event)=>{postStatus(event)}}>
        <FlexGap>
        <Avatar src={currentUserInfo.avatarSrc}/>
        <Status placeholder="What's happening?" maxlength="280" onInput={(event)=>{textAreaLengthFx(event)}}/>
        </FlexGap>
        <FlexContainer>
          {
          characters < 56  && characters > 0 ?
          <span style={{color: 'rgba(194, 196, 0, 1)'}}>{characters}</span>
          : characters < 0 ?
          <span style={{color: 'red'}}>{characters}</span>
          :
          <span>{characters}</span>
      }
          <TweetButton type='submit'>Meow</TweetButton>
          </FlexContainer>
        </Form>
        {
        postError ?
        <>
        <ErrorScreen/>
        <DisplayTweets data={homeFeedInfo}/>
        </>
        :
        <DisplayTweets data={homeFeedInfo}/>

        }
    </FlexColumn>
    </>
  )
  }
}



export const FlexColumn = styled.div`
display: flex;
flex-direction: column;
width: 800px;
align-items: center;
border-right: 1px solid rgba(193, 193, 193, 0.51);
`

const FlexGap = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
gap: 1rem;
`

const FlexContainer = styled.div`
display: flex;
align-items: center;
gap: 1rem;
`

const Form = styled.form`
display: flex;
flex-direction: column;
width: 95%;
align-items: flex-end;
gap: 8px;
padding: 1.5rem 0;
border-bottom: 4px solid rgba(193, 193, 193, 0.3);
`


const Status = styled.textarea`
resize: none;
height: 250px;
width: 70%;
border: none;
padding: 1.5rem;
font-size: 1.5rem;
border-bottom: 1px solid white;
border-top: 1px solid white;

&:focus {
  border-bottom: 1px solid rgba(193, 193, 193, 0.3);
  border-top: 1px solid rgba(193, 193, 193, 0.3);
  outline: none;
}
`

const TweetButton = styled.button`
  background: ${COLORS.primary};
  color: #fff;
  border: none;
  height: 100%;
  padding: 1rem 1.5rem;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border: 2px solid #fff;

  &:hover {
  background: #fff;
  color: ${COLORS.primary};
  border: 2px solid ${COLORS.primary}
  }
`

const Tweet = styled.div`
border-bottom: 1px solid rgba(193, 193, 193, 0.51);
width: 95%;
padding: 1rem 0;
cursor: pointer;
`

export const FlexWrapper = styled.div`
display: flex;
gap: 1rem;
`

const FlexColGap = styled.div`
display: flex;
flex-direction: column;
gap: 0.3rem;
width: 100%;
`

export const Avatar = styled.img`
border-radius: 50%;
height: 60px;

`

export const DisplayName = styled.span`
font-weight: 700;

&:hover {
  text-decoration: underline;
}
`

export const AccentText = styled.span`
color: rgba(149, 149, 149, 0.8);
`

export const Image = styled.img`
width: 90%;
border-radius: 16px;
`

export const IconWrapper = styled.div`
width: 80%;
display: flex;
justify-content: space-between;
`