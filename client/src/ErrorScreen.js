import {FaBomb} from 'react-icons/fa'
import styled from 'styled-components'

export const ErrorScreen = () => {
    return (
        <FlexColumn>
            <FaBomb style={{fontSize: '2rem'}}/>
            <ErrorHeading>An unknown error has occured.</ErrorHeading>
            <p>Please try refreshing the page, or contact support if the problem persists</p>
        </FlexColumn>
    )
}

const ErrorHeading = styled.h1`
`
const FlexColumn = styled.div`
display: flex;
flex-direction: column;
width: 800px;
align-items: center;
justify-content: center;
gap: 1rem;
height: 50vh;
padding: 6rem 0;
`
