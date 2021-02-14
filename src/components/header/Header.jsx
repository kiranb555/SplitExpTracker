import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./Header.style.scss";

const Header = () => {
  return (
    <div className="header">
      <Navbar color="dark" dark>
        <NavbarBrand href="/" className="text-light text-weight-bold">
          {" "}
          App name{" "}
        </NavbarBrand>

        <Nav>
          <NavItem>
            <NavLink href="/" className="text-light">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about" className="text-light">
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact" className="text-light">
              Contact
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
