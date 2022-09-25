
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
import { ErrorScreen } from './ErrorScreen';


const App = () => {
  const {currentUser, dispatch, currentUserInfo, status, error} = useContext(CurrentUserContext)

  return (
    <>
      <GlobalStyles/>
      <BrowserRouter>
        <FlexWrapper>
          <Sidebar/>
          {error ?
          // if error - render error screen - else if state has not yet updated - render load screen - else render content
          <ErrorScreen/>
          : !currentUserInfo ?
          <>
          <FlexLoadingScreen>
            <LoadingScreenCat/>
          </FlexLoadingScreen>
          </>
          :
          <Switch>
          <Route exact path='/'><HomeFeed/></Route>
          <Route exact path='/notifications'><Notifications/></Route>
          <Route exact path='/bookmarks'><Bookmarks/></Route>
          <Route exact path='/tweet/:tweetId'><TweetDetails/></Route>
          <Route exact path='/:profileId'><Profile/></Route>
        </Switch>
          }
        </FlexWrapper>
      </BrowserRouter>
    </>
  )
}
export default App;

const FlexWrapper = styled.div`
display: flex;
`

export const FlexLoadingScreen = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

export const LoadingScreenCat = styled(IoLogoOctocat)`
height: 120px;
width: 100%;
color: ${COLORS.primary}
`


