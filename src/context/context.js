import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

export const GithubContext = React.createContext();

export const GithubProvider = ({ children }) => {
   const [githubUser, setGithubUser] = useState(mockUser);
   const [repos, setRepos] = useState(mockRepos);
   const [followers, setFollowers] = useState(mockFollowers);

   const [requests, setRequests] = useState(0);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState({ show: false, msg: "" });

   function toggleError(show = false, msg = "") {
      setError({ show, msg });
   }
   async function fetchRequest() {
      const request = await axios
         .get(`${rootUrl}/rate_limit`)
         .catch((err) => console.log(err));
      const result = request.data;
      const { rate } = result;
      const { remaining } = rate;
      setRequests(remaining);
      if (remaining === 0) {
         toggleError(true, "Sorry you have exceeded your search limit");
      }
   }
   async function searchGithubUser(user) {
      toggleError();
      setLoading(true);
      const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
         console.log(err)
      );
      console.log(response);
      if (response) {
         setGithubUser(response.data);
         const { login, followers_url } = response.data;

         await Promise.allSettled([
            axios(`${rootUrl}/users/${login}/repos?per_page=100`),
            axios(`${followers_url}?per_page=100`),
         ])
            .then((results) => {
               const [repos, followers] = results;
               const status = "fulfilled";
               if (repos.status === status) {
                  setRepos(repos.value.data);
               }
               if (followers.status === status) {
                  setFollowers(followers.value.data);
               }
            })
            .catch((err) => console.log(err));
      } else {
         toggleError(true, "This username does not exist");
      }
      //dev-8a6-3ia3
      fetchRequest();
      setLoading(false);
   }
   useEffect(fetchRequest, []);

   const value = {
      githubUser,
      repos,
      followers,
      requests,
      error,
      searchGithubUser,
      loading,
   };
   return (
      <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
   );
};
