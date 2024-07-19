import React from "react";

const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="uppercase text-xl font-display chakra-petch">casio</p>
        <div className="w-28 h-8 bg-orange-950 display-shadow rounded-md grid grid-cols-4">
          <div className="border-r border-orange-900"></div>
          <div className="border-r border-orange-900"></div>
          <div className="border-r border-orange-900"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
