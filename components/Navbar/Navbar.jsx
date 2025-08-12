import React from "react";
import { ListElements, ListWrapper, Nav } from "./NavbarStyled";
import Link from "../LinkStyled"

const Navbar = () => (
  <Nav>
    <Link href={'/'}>CrowdDAO</Link>
    <ListWrapper>
      <ListElements>
          <Link href={'/proposals'}>Proposals</Link>
      </ListElements>
    </ListWrapper>
  </Nav>
);

export default Navbar;