import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  InnerText: string;
}
export default function Link_nav_bar(props: Props) {
  return (
    <>
      <NavLink to={props.to}>{props.InnerText}</NavLink>
    </>
  );
}
