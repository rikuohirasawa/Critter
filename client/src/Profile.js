import { useContext, useEffect, useState } from "react";
import { TweetContext } from "./TweetContext";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {GoLocation} from "react-icons/go"
import { AiOutlineCalendar } from "react-icons/ai";
import {COLORS} from './constants';
import { DisplayTweets, Avatar } from "./DisplayTweets";
import { ErrorScreen } from "./ErrorScreen";


export const Profile = () => {
  const {profileInfo, dispatchTweet, userFeed} = useContext(TweetContext);
  const [profileFeedError, setProfileFeedError] = useState(null);
  const {profileId} = useParams();
  
  // fetch user profile information
  useEffect(()=>{
    fetch(`api/${profileId}/profile`)
    .then((res=>{
      if (!res.ok) {
        throw Error('An unknown error has occured.')
      }
      return res.json()}))
    .then((data)=>{
      setProfileFeedError(null)
      dispatchTweet({type: 'store-profile-info', profileInfo: data})
    }).catch(err=>{
      setProfileFeedError(err.message)
    })
  }, [])

  // fetch user feed
  useEffect(()=>{
    fetch(`api/${profileId}/feed`)
    .then((res)=>res.json())
    .then((data)=>{
      dispatchTweet({type: 'store-user-feed', userFeed: data})
    })
  }, [])


  
  if (profileInfo) {
  const profile = profileInfo.profile
  const banner = profile.bannerSrc;

    return (
      <Container>
        {profileFeedError ?
        <ErrorScreen/>
      :
      <>
      {/* pass banner down to styled component as a prop */}
      <Banner banner={banner}></Banner>
      <FlexColumn>
        <JustifyBetween>
          <AvatarStyle src={profile.avatarSrc}></AvatarStyle>
          <FollowButton>Following</FollowButton>
        </JustifyBetween>
        <DisplayName>{profile.displayName}</DisplayName>
        <Handle>
          @{profile.handle} {profile.isFollowingYou && <FollowsYou>Follows you</FollowsYou>}
        </Handle>
        <div>{profile.bio}</div>
        <FlexGap>
          <Handle><GoLocation/> {profile.location}</Handle>
          <Handle><AiOutlineCalendar/> Joined: {profile.joined}</Handle>
        </FlexGap>
        <FlexGap>
          <div>
          <BoldText>{profile.numFollowing}</BoldText> Following
          </div>
          <div> 
          <BoldText>{profile.numFollowers}</BoldText> Followers
          </div>      
        </FlexGap>
      </FlexColumn>
      <JustifySpaceAround>
        <div><BoldText>Tweets</BoldText></div>
        <div><BoldText>Media</BoldText></div>
        <div><BoldText>Likes</BoldText></div>
      </JustifySpaceAround> 
      {
      userFeed && 
      <DisplayTweets data={userFeed}/>
      }
      </>
      }
       
      </Container>
    )
  }
  };

//formatting styles
  
  const Container = styled.div`
  width: 100%;
  `
  const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;;
  align-items: space-between;
  gap: 1rem;
  margin: -4rem auto 0 auto;
  `

  const FlexGap = styled.div`
  display: flex;
  gap: 12px;
  ` 
  const JustifyBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  `
  
  //typography
  const BoldText = styled.span`
  font-weight: 700;
  `

  const Handle = styled.div`
  color: rgba(149, 149, 149);
  `

  //header styles
  const AvatarStyle = styled(Avatar)`
  width: 140px;
  border: 2px solid #fff;
  `
  
  const Banner = styled.div`
  background-image: url(${props => props.banner});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 300px;
  `

  const DisplayName = styled.div`
  font-weight: 700;
  font-size: 1.5rem;

  &:hover,
  &:focus {
    text-decoration: underline;
    cursor: pointer;
    z-index: 99;
  }
  `

  const FollowsYou = styled.span`
  font-size: 0.8rem;
  background: rgba(149, 149, 149, 0.15);
  padding: 3px 6px;
  border-radius: 4px;
  margin: 0 4px;
  `

  const FollowButton = styled.button`
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

const JustifySpaceAround = styled.div`
display: flex;
border-bottom: 1px solid rgba(149, 149, 149, 0.8);
justify-content: space-around;
padding: 1.5rem 0;
`




