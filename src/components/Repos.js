import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
   const chartData = [
      {
         label: "Venezuela",
         value: "290",
      },
      {
         label: "Saudi",
         value: "260",
      },
      {
         label: "Canada",
         value: "180",
      },
      {
         label: "Iran",
         value: "140",
      },
   ];
   const { repos } = React.useContext(GithubContext);
   const languages = repos.reduce((total, item) => {
      const { language, stargazers_count } = item;
      if (!language) return total;
      if (!total[language]) {
         total[language] = { label: language, value: 1, stars: stargazers_count };
      } else {
         total[language].value = total[language].value + 1;
         total[language].stars = total[language].stars + stargazers_count;
      }
      return total;
   }, {});

   const mostUsed = Object.values(languages)
      .sort((a, b) => {
         return b.value - a.value;
      })
      .slice(0, 6);

   const mostPopular = Object.values(languages)
      .sort((a, b) => {
         return b.stars - a.stars;
      })
      .map((item) => {
         return { ...item, value: item.stars };
      })
      .slice(0, 3);

   let { stars, forks } = repos.reduce(
      (total, item) => {
         const { name, watchers_count, forks } = item;
         total.stars[name] = { label: name, value: watchers_count };
         total.forks[name] = { label: name, value: forks };
         return total;
      },
      { stars: {}, forks: {} }
   );

   stars = Object.values(stars)
      .sort((a, b) => {
         return b.value - a.value;
      })
      .slice(0, 5);
   forks = Object.values(forks)
      .sort((a, b) => {
         return b.value - a.value;
      })
      .slice(0, 5);
   console.log(forks);
   console.log(stars);
   return (
      <section className='section'>
         <Wrapper className='section-center'>
            <Pie3D data={mostUsed} />
            <Column3D data={stars} />
            <Doughnut2D data={mostPopular} />
            <Bar3D data={forks} />
         </Wrapper>
      </section>
   );
};

const Wrapper = styled.div`
   display: grid;
   justify-items: center;
   text-align: center;
   gap: 2rem;
   @media (min-width: 800px) {
      grid-template-columns: 1fr 1fr;
   }
   @media (min-width: 1200px) {
      grid-template-columns: 2fr 3fr;
   }
   div {
      width: 100% !important;
   }
   .fusioncharts-container {
      width: 100% !important;
   }
   svg {
      box-shadow: var(--light-shadow);
      width: 100% !important;
      border-radius: var(--radius) !important;
   }
`;
export default Repos;