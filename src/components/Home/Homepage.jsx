import React from "react";
import HomeNav from "./HomeNav";
import WhyJoin from "./WhyJoin";
import Who from "./Who";
import Hero from "./Hero";

function Homepage() {
  return (
    <>
      <HomeNav />
      <Hero />
      <Who />
      <WhyJoin />
    </>
  );
}

export default Homepage;
