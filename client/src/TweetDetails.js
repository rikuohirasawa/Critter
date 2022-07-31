import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { TweetContext } from "./TweetContext";
import {Avatar, AccentText, DisplayName, FlexWrapper, Image, IconWrapper, FlexColumn} from "./HomeFeed";
import styled from "styled-components";
import { MdOutlineArrowBack } from "react-icons/md"
import { BsChat } from "react-icons/bs";
import {AiOutlineRetweet, AiOutlineHeart} from "react-icons/ai"
import {FiUpload} from "react-icons/fi"
import { DisplayTweets } from "./DisplayTweets";
import { useHistory } from "react-router-dom";
import { Icons } from "./Icons";
import { useState } from "react";
import { ErrorScreen } from "./ErrorScreen";

export const TweetDetails = () => {
  const { tweetInfo, dispatchTweet } = useContext(TweetContext)
  const {tweetId} = useParams();
  const history = useHistory();
  const [tweetDetailsError, setTweetDetailsError] = useState(null)

  useEffect(()=>{
    fetch(`/api/tweet/${tweetId}`)
    .then((res=>{
      if (!res.ok) {
        throw Error('An unknown error has occured.')
      }
      return res.json()
    }))
    .then((data)=>{
      setTweetDetailsError(null)
      dispatchTweet({type: 'store-tweet-details' , tweetInfo: data})
    }).catch(err=>{
      setTweetDetailsError(err.message)
    })
  }, [])
  
  
  if (tweetInfo) {
  const tweet = tweetInfo.tweet
  const author = tweet.author

  const handleClickProfile = () => {
    history.replace(`/${author.handle}`)
}


  // Please note that the hours/minutes are ahead by 1.5hrs, apparently due to my timezone, 
  // there is a fix that I may try to implement later but for now I am leaving it as 
  // is - you can read more here if interested:
  // https://stackoverflow.com/questions/21134980/why-does-dategethours-return-hour-1
  // https://stackoverflow.com/questions/32469269/javascript-date-give-wrong-date-off-by-one-hour
  const tweetDate = new Date(`${tweet.timestamp}`)
  let tweetHours = tweetDate.getHours();
  const tweetMinutes = tweetDate.getMinutes();
  const tweetDay = tweetDate.getDate();
  const tweetMonth = tweetDate.getMonth();
  const tweetYear = tweetDate.getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
  'Oct', 'Nov', 'Dec']

  return (
    <StyleColumn>
    <Header><MdOutlineArrowBack/> Meow</Header>
    {tweetDetailsError ?
    <ErrorScreen/>
  :
    <Content>
    <StyleFlexWrapper>
      <AvatarStyle src={author.avatarSrc}/>
      <div>
        <div onClick={()=>{handleClickProfile()}}><DisplayName>{author.displayName}</DisplayName></div>
        <div><AccentText>@{author.handle}</AccentText></div>
      </div>
    </StyleFlexWrapper>
    <Status>{tweet.status}</Status>
    {tweet.media[0] &&
    <Media src={tweet.media[0].url}/>}
    <div><AccentText>
    {tweetHours === 0 
        ?
        <span>12:{
          tweetMinutes < 10 ?
          <span>0{tweetMinutes}</span>
          : 
          <span>{tweetMinutes}</span>} AM</span>
        :
        tweetHours === 12 
        ?
        <span>12:{
          tweetMinutes < 10 ?
          <span>0{tweetMinutes}</span>
          : 
          <span>{tweetMinutes}</span>} PM</span>
        :
        tweetHours > 12 
        ?
        <span>{tweetHours%12}:{
          tweetMinutes < 10 ?
          <span>0{tweetMinutes}</span>
          : 
          <span>{tweetMinutes}</span>} PM</span>
        :
        <span>{tweetHours}:{
          tweetMinutes < 10 ?
        <span>0{tweetMinutes}</span>
        : 
        <span>{tweetMinutes}</span>} AM</span>
    } {months[tweetMonth]} {tweetDay} {tweetYear} Critter Web App</AccentText></div>
    <Icons 
    data={tweet}
    id={tweet.id}
    />
  </Content>
  }
 
    </StyleColumn>
  )
  }
  };
  


const Header = styled.header`
font-weight: 700;
font-size: 1.25rem;
width: 100%;
border-bottom: 1px solid rgba(149, 149, 149, 0.3);
padding: 1rem 0;
display: flex;
gap: 1rem;
`

const StyleColumn = styled(FlexColumn)`
border: 1px solid rgba(149, 149, 149, 0.3);
align-items: flex-start;
width: 80%;
height: 100vh;
`

const Content = styled.div`
width: 95%;
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 1rem;
padding-top: 1rem;
max-height: 80vh;
`

const StyleFlexWrapper = styled(FlexWrapper)`
align-items: center;
`

const AvatarStyle = styled(Avatar)`
width: 60px;
height: auto;
`

const Status = styled.div`
font-size: 1.75rem;
`

const Media = styled(Image)`
width: 100%;
max-height: 80%;
object-fit: cover;
`

const StyleIconWrapper = styled(IconWrapper)`
width: 96%;
display: flex;
justify-content: space-evenly;
padding: 1rem 0;
margin: 0 auto;
border-top: 1px solid rgba(149, 149, 149, 0.3);
font-size: 1.25rem;
`