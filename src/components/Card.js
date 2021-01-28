import React from "react";
import { GithubContext } from "../context/context";
import styled from "styled-components";
import { MdBusiness, MdLocationOn } from "react-icons/md";
const Card = () => {
   const { githubUser } = React.useContext(GithubContext);
   const {
      avatar_url,
      html_url,
      name,
      company,

      bio,
      location,
      twitter_username,
   } = githubUser;
   return (
      <Wrapper>
         <header>
            <img src={avatar_url} alt={name} />
            <div>
               <h4>{name}</h4>
               <p>@{twitter_username || "no twitter Account"}</p>
            </div>
            <a rel='noopener noreferrer' href={html_url} target='_blank'>
               Follow
            </a>
         </header>
         <p className='bio'>{bio || "hello world!"}</p>
         <div className='links'>
            <p>
               <MdBusiness />
               {company}
            </p>

            <p>
               <MdLocationOn />
               {location || "earth"}
            </p>
         </div>
      </Wrapper>
   );
};
const Wrapper = styled.article`
   max-width: 90vw;
   box-shadow: var(--light-shadow);
   padding: 1.5rem 2rem;
   border-top-right-radius: var(--radius);
   border-bottom-left-radius: var(--radius);
   border-bottom-right-radius: var(--radius);
   position: relative;
   &::before {
      box-shadow: var(--dark-shadow);
      content: "User";
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);

      color: var(--clr-grey-5);
      border-top-right-radius: var(--radius);
      border-top-left-radius: var(--radius);
      text-transform: capitalize;
      padding: 0.5rem 1rem 0 1rem;
      letter-spacing: var(--spacing);
      font-size: 1rem;
   }
   header {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      column-gap: 1rem;
      margin-bottom: 1rem;
      img {
         width: 55px;
         height: 55px;
         border-radius: 50%;
      }
      h4 {
         margin-bottom: 0.25rem;
      }
      p {
         margin-bottom: 0;
      }
      a {
         background: #67e1e9;
         box-shadow: inset 12px 12px 15px #5fcfd6,
            inset -12px -12px 15px #6ff3fc;
         color: var(--clr-white);

         padding: 0.5em 1rem;
         border-radius: 1rem;
         text-transform: capitalize;
         letter-spacing: var(--spacing);
         transition: var(--transition);
         cursor: pointer;
         &:hover {
            background: var(--clr-white);
            box-shadow: inset 12px 12px 15px #dbdde0,
               inset -12px -12px 12px #ffffff;
            color: var(--clr-primary-5);
         }
      }
   }
   .bio {
      color: var(--clr-grey-3);
   }
   .links {
      p,
      a {
         margin-bottom: 0.25rem;
         display: flex;
         align-items: center;
         svg {
            margin-right: 0.5rem;
            font-size: 1.3rem;
         }
      }
      a {
         color: var(--clr-primary-5);
         transition: var(--transition);
         svg {
            color: var(--clr-grey-5);
         }
         &:hover {
            color: var(--clr-primary-3);
         }
      }
   }
`;
export default Card;
