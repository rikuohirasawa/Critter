import { useEffect, useContext } from "react";
import { CurrentUserContext } from './CurrentUserContext';
import { TweetContext } from "./TweetContext";
import styled from "styled-components";

import { BsChat } from "react-icons/bs";
import {AiOutlineRetweet, AiOutlineHeart} from "react-icons/ai"
import {FiUpload} from "react-icons/fi"
import { useHistory } from "react-router-dom";

export const HomeFeed = () => {
  const {dispatch, homeFeedInfo, tweetInfo} = useContext(CurrentUserContext);
  const {dispatchTweet, profileInfo} = useContext(TweetContext);
  const history = useHistory();
  
  useEffect(()=>{
    fetch('/api/me/home-feed')
    .then((res)=>res.json())
    .then((data)=>{
      dispatch({type: 'store-home-feed-info', homeFeedInfo: data.tweetsById})
    })
  }, [])
  
  if (homeFeedInfo) {
    //create new array of tweets sorted by date in descending order
    const tweetsByDate = (Object.values(homeFeedInfo).sort((a, b) =>{
      return new Date(`${a.timestamp}`) - new Date(`${b.timestamp}`)
    }));
    tweetsByDate.reverse();

    return (
      <FlexColumn>
      {tweetsByDate.map(element=>{
        const author = element.author;
        const tweetDay = new Date(`${element.timestamp}`).getDate();
        const tweetMonth = new Date(`${element.timestamp}`).getMonth();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
      'Oct', 'Nov', 'Dec']
      
      const handleClickTweet = () => {
        history.push(`/tweet/${element.id}`)
        // fetch(`/api/tweet/${element.id}`)
        // .then((res)=>res.json())
        // .then((data)=>{
        //   dispatchTweet({type: 'store-tweet-details' , tweetInfo: data})
        // })
      }
      console.log(author.handle)

      const handleClickProfile = () => {
        history.push(`${author.handle}`)
        // fetch(`api/${author.handle}/profile`)
        // .then((res)=>res.json())
        // .then((data)=>{
        //   dispatchTweet({type: 'store-profile-info', profileInfo: data})
        // })
      }
        return (
          <Tweet 
          onClick={()=>{handleClickTweet()}}
          >
            <FlexWrapper>
            <Avatar src={author.avatarSrc}/>
            <FlexColGap>
              <div>
                <DisplayName onClick={(event)=>{
                  event.stopPropagation()
                  handleClickProfile()}}>{author.displayName}</DisplayName> <AccentText>@{author.handle} {months[tweetMonth]}-{tweetDay}</AccentText>
              </div>
              <div>{element.status}</div>
              {
              element.media[0] &&
              <Image src={element.media[0].url}></Image>
              } 
              <IconWrapper><BsChat/><AiOutlineRetweet/><AiOutlineHeart/><FiUpload/></IconWrapper>
            </FlexColGap>
            </FlexWrapper>
          </Tweet>
        )
      })}
      </FlexColumn>
    )
}
}

export const FlexColumn = styled.div`
display: flex;
flex-direction: column;
width: 800px;
align-items: center;
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
width: 40px;
height: 100%;
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
