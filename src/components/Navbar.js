import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
   const {
      isAuthenticated,

      logout,
      user,
      isLoading,
   } = useAuth0();
   const isUser = isAuthenticated && user && !isLoading;
   return (
      <Wrapper>
         {isUser && user.picture && <img src={user.picture} alt={user.name} />}
         {isUser && user.name && (
            <h4>
               Welcome <strong>{user.name.toUpperCase()}</strong>
            </h4>
         )}
         {isUser && (
            <button
               onClick={() => {
                  logout({ returnTo: window.location.origin });
               }}
            >
               logout
            </button>
         )}
      </Wrapper>
   );
};

const Wrapper = styled.nav`
   padding: 1.1rem;
   margin-bottom: 4rem;
   background: var(--clr-white);
   text-align: center;
   display: grid;
   grid-template-columns: auto auto 100px;
   justify-content: center;
   align-items: center;
   gap: 1.5rem;
   box-shadow: var(--dark-shadow);
   h4 {
      margin-bottom: 0;
      font-weight: 400;
   }
   img {
      box-shadow: var(--dark-shadow);
      padding: 1.5px;
      color: var(--clr-white);
      width: 75px !important;
      height: 75px;
      border-radius: 50%;
      object-fit: cover;
   }
   button {
      background: transparent;
      border: transparent;
      font-size: 1.2rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      color: var(--clr-grey-5);
      cursor: pointer;
      box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
         -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
         inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
         inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
      padding: 10px;
      border-radius: 12px;
   }
`;

export default Navbar;
