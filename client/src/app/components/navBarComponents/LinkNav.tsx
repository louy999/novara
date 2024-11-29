import React from "react";
import Link from "next/link";

const LinkNav = () => {
  return (
    <div className="navbar-center hidden md:flex">
      <ul className="menu menu-horizontal px-1 gap-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/search">Search</Link>
        </li>
        <li>
          <Link href="/request">Request</Link>
        </li>
      </ul>
    </div>
  );
};

export default LinkNav;
