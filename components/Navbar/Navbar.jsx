import React from "react";
import { Logo, Nav } from "./NavbarStyled";
import Link from "../LinkStyled"

const Navbar = () => (
  <Nav>
    <Logo>
        <Link href={'/'}>CrowdDAO</Link>
    </Logo>
    <div>
        <Link href={'/proposals'}>Proposals</Link>
    </div>
  </Nav>
);

export default Navbar;