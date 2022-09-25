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
                <StyleNavLink to='/treasurymog'>
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
width: 200px;
border-right: 1px solid rgba(193, 193, 193, 0.51);
padding: 24px 12px;
`

const StyleNavLink = styled(NavLink)`
color: black;
display: flex;
gap: 6px;
border-radius: 18px;
padding: 8px 16px;
text-decoration: none;
width: 80%;

&:active,
&:hover,
&:focus {
    color: ${COLORS.primary};
    background: hsl(258deg, 100%, 50%, 0.2);
}
`