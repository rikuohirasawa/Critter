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

export const TweetDetails = () => {
  const { tweetInfo, dispatchTweet } = useContext(TweetContext)

  const {tweetId} = useParams();
  
  useEffect(()=>{
    fetch(`/api/tweet/${tweetId}`)
    .then((res)=>res.json())
    .then((data)=>{
      dispatchTweet({type: 'store-tweet-details' , tweetInfo: data})
    })
  }, [])
  
  
  if (tweetInfo) {
  const tweet = tweetInfo.tweet
  const author = tweet.author
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


  console.log(tweetInfo)
  return (
    <StyleColumn>
    <Header><MdOutlineArrowBack/> Meow</Header>
    <Content>
      <StyleFlexWrapper>
        <AvatarStyle src={author.avatarSrc}/>
        <div>
          <div><DisplayName>{author.displayName}</DisplayName></div>
          <div><AccentText>@{author.handle}</AccentText></div>
        </div>
      </StyleFlexWrapper>
      <Status>{tweet.status}</Status>
      {tweet.media[0] &&
      <Media src={tweet.media[0].url}/>}
      <div><AccentText>
      {tweetHours === 0 
          ?
          <span>12:{tweetMinutes} AM</span>
          :
          tweetHours === 12 
          ?
          <span>12:{tweetMinutes} PM</span>
          :
          tweetHours > 12 
          ?
          <span>{tweetHours%12}:{tweetMinutes} PM</span>
          :
          <span>{tweetHours}:{tweetMinutes} AM</span>
      } {months[tweetMonth]} {tweetDay} {tweetYear} Critter Web App</AccentText></div>
      <StyleIconWrapper><BsChat/><AiOutlineRetweet/><AiOutlineHeart/><FiUpload/></StyleIconWrapper>
    </Content>
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