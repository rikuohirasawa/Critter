
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import { HomeFeed } from "./HomeFeed";
import { Notifications } from "./Notifications";
import { Bookmarks } from "./Bookmarks";
import { TweetDetails } from "./TweetDetails";
import { Profile } from "./Profile";
import GlobalStyles from "./GlobalStyles";
import { Sidebar } from './Sidebar';
import styled from 'styled-components';

import { useContext } from 'react';
import { CurrentUserContext } from './CurrentUserContext';

import {IoLogoOctocat} from 'react-icons/io';
import {COLORS} from './constants';


const App = () => {
  const {currentUser, dispatch, currentUserInfo} = useContext(CurrentUserContext)
  // console.log(useContext(CurrentUserContext))


  if (!currentUserInfo) {
    return (
      <FlexLoadingScreen>
        <LoadingScreenCat/>
      </FlexLoadingScreen>
    )
  } else {
  return (
    <>

      <GlobalStyles/>
      <BrowserRouter>
        <FlexWrapper>
          {/* <button onClick={()=>{dispatch({type: 'set-current-user', currentUser: 'rikuo'})}}>{currentUserInfo.handle}</button> */}
          <Sidebar/>
          <Switch>
            <Route exact path='/'><HomeFeed/></Route>
            <Route exact path='/notifications'><Notifications/></Route>
            <Route exact path='/bookmarks'><Bookmarks/></Route>
            <Route exact path='/tweet/:tweetId'><TweetDetails/></Route>
            <Route exact path='/:profileId'><Profile/></Route>
          </Switch>
        </FlexWrapper>
      </BrowserRouter>
    </>
  )
}
}
export default App;

const FlexWrapper = styled.div`
display: flex;
`

const FlexLoadingScreen = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const LoadingScreenCat = styled(IoLogoOctocat)`
height: 120px;
width: 100%;
color: ${COLORS.primary}
`


