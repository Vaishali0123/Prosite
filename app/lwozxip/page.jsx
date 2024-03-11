import React, { Suspense } from "react";
import Component from "./component";

const page = () => {
  return (
    <>
      <Suspense fallback={<>Loading</>}>
        <Component />
      </Suspense>
    </>
  );
};

export default page;
