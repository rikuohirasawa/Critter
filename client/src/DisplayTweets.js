const DisplayTweets = (arr) => {
    return (
        arr.map(element=>{
            const author = element.author;
            const tweetDay = new Date(`${element.timestamp}`).getDate();
            const tweetMonth = new Date(`${element.timestamp}`).getMonth();
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
            'Oct', 'Nov', 'Dec']

            const handleClickTweet = () => {
                history.push(`/tweet/${element.id}`)
            }

            const handleClickProfile = () => {
                history.push(`${author.handle}`)
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
        })
    )
}