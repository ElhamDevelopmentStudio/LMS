import React from "react";
import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <>
      <h1>Hello</h1>
      <UserButton afterSignOutUrl="/" />
    </>
  );
};

export default Home;
