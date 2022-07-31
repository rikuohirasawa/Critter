import { BsChat } from "react-icons/bs";
import {AiOutlineRetweet, AiOutlineHeart} from "react-icons/ai"
import {FiUpload} from "react-icons/fi"
import { CurrentUserContext } from './CurrentUserContext';
import styled from 'styled-components'
import { useContext } from "react";

export const Icons = ({data, id}) => {
    const {dispatch, userLiked} = useContext(CurrentUserContext);
    const handleClickLike = () => {
        if (data.isLiked === false) {
        dispatch({type: 'store-user-liked', key: id, liked: true})
        data.isLiked = true;
        data.numLikes += 1;
        console.log(data.numLikes)
        // console.log(isLiked)

        }
        else if (data.isLiked === true) {
        dispatch({type: 'store-user-liked', key: id, liked: false})
        data.isLiked = false;
        data.numLikes -=1
        // console.log(numLikes)
        }
    }
    const handleClickRetweet = () => {
        if (data.isRetweeted === false) {
            dispatch({type: 'store-user-retweeted', key: id, retweeted: true})
            data.isRetweeted = true;
            data.numRetweets += 1
            if (data.numLikes > 0 ) {
                // console.log(numLikes)
            }
        } else if (data.isRetweeted === true) {
            dispatch({type: 'store-user-retweeted', key: id, retweeted: false})
            data.isRetweeted = false;
            data.numRetweets -= 1;
        }
    }

    if (data) 
   { return (
        <IconWrapper>
            <BsChat/>

            <FlexIcon>
                <IconButton type='retweet'>
                <RetweetIcon onClick={(event)=>{
                    event.stopPropagation()
                    handleClickRetweet()}}
                    style={{color:
                    data.isRetweeted === true
                    &&
                    'rgba(39, 178, 245, 1)'}}/>
                </IconButton>
                    {data.numRetweets > 0 && data.isRetweeted &&
                    <div style={{color: 'rgba(39, 178, 245, 1)'}}>{data.numRetweets}</div>
                }
            </FlexIcon>
            
            <FlexIcon>
                <IconButton type='heart' onClick={(event)=>{
                    event.stopPropagation()
                    handleClickLike()
                    }}
                    style={{color:
                        data.isLiked === true 
                        &&
                        'rgba(237, 111, 134, 1)'}}>     
                <HeartIcon />
                </IconButton>
                {data.numLikes > 0 && data.isLiked === true &&
                <div style={{color: 'rgba(237, 111, 134, 1)'}}>{data.numLikes}</div>
                }
            </FlexIcon>
            <FiUpload/>
    </IconWrapper>
    )}
}

const IconWrapper = styled.div`
width: 80%;
display: flex;
justify-content: space-between;
font-size: 18px;
align-items: center;
`

const FlexIcon = styled.div`
display: flex;
align-items: center;
gap: 2px;
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

const HeartIcon = styled(AiOutlineHeart)`
font-size: 18px;
`
const RetweetIcon = styled(AiOutlineRetweet)`
font-size: 18px;
`