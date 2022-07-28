import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from './CurrentUserContext';
import styled from "styled-components";

import { BsChat } from "react-icons/bs";
import {AiOutlineRetweet, AiOutlineHeart} from "react-icons/ai"
import {FiUpload} from "react-icons/fi"

import { useHistory } from "react-router-dom";


export const HomeFeed = () => {
  const {state, dispatch} = useContext(CurrentUserContext);
  const history = useHistory();
  const [tweetsState, setTweetsState] = useState(null);
  
  useEffect(()=>{
    fetch('/api/me/home-feed')
    .then((res)=>res.json())
    .then((data)=>{
      setTweetsState(data.tweetsById)
    })
  }, [])



  if (tweetsState) {
    //create new array of tweets sorted by date in descending order
    const tweetsByDate = (Object.values(tweetsState).sort((a, b) =>{
      return new Date(`${a.timestamp}`) - new Date(`${b.timestamp}`)
    }));
    tweetsByDate.reverse();
    console.log(tweetsByDate)




    return (
      <FlexColumn>
      {tweetsByDate.map(element=>{
        const author = element.author;
        const tweetDay = new Date(`${element.timestamp}`).getDate();
        const tweetMonth = new Date(`${element.timestamp}`).getMonth();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
      'Oct', 'Nov', 'Dec']

      const handleClick = () => {
            history.push(`/tweet/:${element.id}`)
          }

      console.log(element)
        return (
          <Tweet onClick={()=>{handleClick()}}>
            <FlexWrapper>
            <Avatar src={author.avatarSrc}/>
            <FlexColGap>
              <div>
                <UserHandle>{author.displayName}</UserHandle> <AccentText>@{author.handle} {months[tweetMonth]}-{tweetDay}</AccentText>
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

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
border: 1px solid black;
width: 800px;
align-items: center;
`

const Tweet = styled.div`
border-bottom: 1px solid rgba(193, 193, 193, 0.51);
width: 95%;
padding: 1rem 0;
cursor: pointer;
`

const FlexWrapper = styled.div`
display: flex;
gap: 1rem;
`

const FlexColGap = styled.div`
display: flex;
flex-direction: column;
gap: 0.2rem;
width: 100%;
border: 1px solid red;
`

const Avatar = styled.img`
border-radius: 50%;
width: 40px;
height: 100%;
`

const UserHandle = styled.span`
font-weight: 700;
`

const AccentText = styled.span`
color: rgba(149, 149, 149, 0.8);
`

const Image = styled.img`
width: 90%;
border-radius: 16px;
`

const IconWrapper = styled.div`
width: 80%;
display: flex;
justify-content: space-between;
border: 1px solid pink;
`
