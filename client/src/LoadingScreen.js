import {IoLogoOctocat} from 'react-icons/io';
import {COLORS} from './constants';
import styled from 'styled-components';


export const LoadingScreen = () => {
    return (
    <FlexLoadingScreen>
        <LoadingScreenCat/>
    </FlexLoadingScreen>
  )
}

const FlexLoadingScreen = styled.div`
width: 800px;
height: 50vh;
display: flex;
justify-content: center;
align-items: center;
`

const LoadingScreenCat = styled(IoLogoOctocat)`
height: 160px;
width: 100%;
color: ${COLORS.primary}
`