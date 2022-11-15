import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./Header.style.scss";

const Header = () => {
  return (
    <div className="headeer">
      <Navbar color="dark" dark>
        <NavbarBrand href="/"> App name </NavbarBrand>

        <Nav>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">Contact</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
