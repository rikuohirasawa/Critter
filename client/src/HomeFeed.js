import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from './CurrentUserContext';
import styled from "styled-components";

export const HomeFeed = () => {
  const {currentUserInfo} = useContext(CurrentUserContext);
  
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
      console.log(tweetMonth)
        return (
          <>
          <div>{author.displayName}</div>
          <div>@{author.handle}</div>
          <div>{months[tweetMonth]}-{tweetDay}</div>
          <div>{element.status}</div>
           {element.media[0] &&
          <img src={element.media[0].url}></img>
          } 
          </>
        )
      })}
      </FlexColumn>
    )
}
}

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
`

const Tweet = styled.div`
`

const Image = styled.img`
`