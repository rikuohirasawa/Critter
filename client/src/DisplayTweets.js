import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import {AiOutlineRetweet, AiOutlineHeart} from "react-icons/ai"
import {FiUpload} from "react-icons/fi"
import { useContext, useState } from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import {LoadingScreen} from "./LoadingScreen";


export const DisplayTweets = ({data}) => {
    const history = useHistory();
    const {dispatch, userLiked} = useContext(CurrentUserContext);
    // if data not yet loaded - render loading screen
    if (!data) {
        return <LoadingScreen/>
    }
    else {
        return (   
            <FlexColumn>
            {data.tweetIds.map(element=>{
            const objAccess = data.tweetsById[element];
            const author = objAccess.author;
            const tweetDay = new Date(`${objAccess.timestamp}`).getDate();
            const tweetMonth = new Date(`${objAccess.timestamp}`).getMonth();
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            
            const handleClickTweet = () => {
                history.push(`/tweet/${objAccess.id}`)
            }
            const handleClickProfile = () => {
                history.push(`${author.handle}`)
            }
            const handleClickLike = () => {
                if (objAccess.isLiked === false) {
                dispatch({type: 'store-user-liked', key: element, liked: true})
                objAccess.isLiked = true;
                objAccess.numLikes += 1;
                } 
                else if (objAccess.isLiked === true) {
                dispatch({type: 'store-user-liked', key: element, liked: false})
                objAccess.isLiked = false;
                objAccess.numLikes -= 1;
                }
            }

            const handleClickRetweet = () => {
                if (objAccess.isRetweeted === false) {
                    dispatch({type: 'store-user-retweeted', key: element, retweeted: true})
                    objAccess.isRetweeted = true;
                    objAccess.numRetweets += 1
                } else if (objAccess.isRetweeted === false) {
                    objAccess.isRetweeted = false;
                    dispatch({type: 'store-user-retweeted', key: element, retweeted: false})
                    objAccess.numRetweets -= 1
                }
            }

            const handleClickRetweetedFrom = () => {
                history.push(`${objAccess.retweetFrom.handle}`)
            }
            
            // super super janky solution I used to try and retain likes throughout the pages,
            // it kind of works but updates all the liked tweets at once - hopefully next time
            // i will read the instructions more clearly... and just go with the POST first lol
            // if (userLiked[element]) {
            //     objAccess.isLiked = true;
            //     objAccess.numLikes += 1;
            // }
            return (     
                <Tweet 
                onClick={()=>{handleClickTweet()}}>
                    {objAccess.retweetFrom && 
                    <RetweetText onClick={(event)=>{
                        event.stopPropagation()
                        handleClickRetweetedFrom()}}><AiOutlineRetweet/> Retweeted By {objAccess.retweetFrom.displayName}</RetweetText>}
                  <FlexWrapper>
                    <Avatar src={author.avatarSrc}/>
                    <FlexColGap>
                        <div>
                        <DisplayName onClick={(event)=>{
                            event.stopPropagation()
                            handleClickProfile()}}>{author.displayName}</DisplayName> <AccentText>@{author.handle} {months[tweetMonth]}-{tweetDay}</AccentText>
                        </div>
                        <div>{objAccess.status}</div>
                        {
                        objAccess.media[0] &&
                        <Image src={objAccess.media[0].url}></Image>
                        } 
                        
                        <IconWrapper>
                            <BsChat/>

                            <FlexIcon>
                                <IconButton type='retweet'>
                                <RetweetIcon onClick={(event)=>{
                                    event.stopPropagation()
                                    handleClickRetweet()}}
                                    style={{color:
                                    objAccess.isRetweeted === true
                                    &&
                                    'rgba(39, 178, 245, 1)'}}/>
                                </IconButton>
                                    {objAccess.numRetweets > 0 && objAccess.isRetweeted &&
                                    <div style={{color: 'rgba(39, 178, 245, 1)'}}>{objAccess.numRetweets}</div>
                                }
                            </FlexIcon>
                            
                            <FlexIcon>
                                <IconButton type='heart' onClick={(event)=>{
                                    event.stopPropagation()
                                    handleClickLike()
                                    }}
                                    style={{color:
                                        objAccess.isLiked === true 
                                        &&
                                        'rgba(237, 111, 134, 1)'}}>     
                                <HeartIcon />
                                </IconButton>
                                {objAccess.numLikes > 0 && objAccess.isLiked &&
                                <div style={{color: 'rgba(237, 111, 134, 1)'}}>{objAccess.numLikes}</div>
                                }
                            </FlexIcon>
                            <FiUpload/>
                        </IconWrapper>
                    </FlexColGap>
                  </FlexWrapper>
                </Tweet>         
            )
        })}
        </FlexColumn>
        )
    }
}

const RetweetText = styled.div`
font-size: 0.75rem;
color: rgba(193, 193, 193, 1);
padding-bottom: 10px;
margin-left: 4%;
display: flex;
align-items: center;
gap: 1%;

&:hover{
    text-decoration: underline;
}
`
const HeartIcon = styled(AiOutlineHeart)`
font-size: 18px;
`
const RetweetIcon = styled(AiOutlineRetweet)`
font-size: 18px;
`

const FlexIcon = styled.div`
display: flex;
align-items: center;
gap: 2px;`

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
font-size: 18px;
align-items: center;
`

const IconButton = styled.button`
border-radius: 50%;
height: 28px;
width: 28px;
display: flex;
justify-content: center;
align-items: center;
border: none;
cursor: pointer;
background: #fff;

&:hover,
&:active {
    background: ${(props=>(props.type === 'heart'
        ?
        'rgba(237, 111, 134, 0.2);'
        :
        props.type === 'retweet' ?
        'rgba(39, 178, 245, 0.2);'
        :
        'rgba(213, 39, 245, 0.8);'
    ))    
};
    color: ${(props=>(props.type === 'heart'
        ?
        'rgba(237, 111, 134, 1);'
        :
        props.type === 'retweet' ?
        'rgba(39, 178, 245, 1);'
        :
        'rgba(213, 39, 245, 0.8);'
    ))   
}
}
`
