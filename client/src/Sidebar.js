import Logo from "./Logo";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import {FiUser, FiHome} from 'react-icons/fi';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {BsBookmark} from 'react-icons/bs';
import {COLORS} from './constants';

export const Sidebar = () => {
    return (
        <>
            <FlexContainer>
            <Logo/>
                <StyleNavLink to='/'>
                    <FiHome/>
                    Home
                </StyleNavLink>
                <StyleNavLink to='/:profileId'>
                    <FiUser/>
                    Profile
                </StyleNavLink>
                <StyleNavLink to='/notifications'>
                    <IoMdNotificationsOutline/>
                    Notifications
                </StyleNavLink>
                <StyleNavLink to='/bookmarks'>
                    <BsBookmark/>
                    Bookmarks
                </StyleNavLink>
            </FlexContainer>
        </>
    )
}

const FlexContainer = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
`

const StyleNavLink = styled(NavLink)`
color: black;
border-radius: 18px;
padding: 8px 16px;
text-decoration: none;

&:active,
&:hover,
&:focus {
    color: ${COLORS.primary};
    background: hsl(258deg, 100%, 50%, 0.2);
}
`