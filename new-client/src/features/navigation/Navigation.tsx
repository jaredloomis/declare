import React from "react";
import { atom, useAtom } from "jotai";
import { Link } from "react-router-dom";

export function Navigation({}) {
  return (
    <nav className="bg-gray-100 border border-b-gray-200 py-3.5 px-5">
      <ul>
        <li>
          <Link to="/">Logo</Link>
        </li>
      </ul>
    </nav>
  );
}
