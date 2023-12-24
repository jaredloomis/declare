import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      Oops! We couldn't find that. Maybe you want to go <Link to="/">home</Link>?
    </>
  );
}
