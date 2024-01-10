import React, { ComponentType } from "react";
import Navbar from "../components/Navbar";

export type AppWrapFunction<P = object> = <T extends P>(
  Component: ComponentType<T>,
  classNames?: string
) => React.FC<T>;

const AppWrap: AppWrapFunction = (MainComponent) => (props) =>
  (
    <>
      <Navbar />
      <MainComponent {...props} />
    </>
  );

export default AppWrap;
