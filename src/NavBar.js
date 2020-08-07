import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
        <Navbar style={{position:"absolute", height:props.mobile?"":80, top:"0px", width:"100%"}} color="light" light expand="md">
            <NavbarBrand href="/">
                <img src="./images/mildang.png" alt="밀당" width={props.mobile?"36px":"48px"}/>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr" style={{color:"red",fontSize:props.mobile?"":"20px"}} navbar>
                    <NavItem style={{cursor:"pointer"}} onClick={()=>props.setPage(1,toggle)}>
                        <NavLink>집중관리</NavLink>
                    </NavItem>
                    <NavItem style={{cursor:"pointer"}} onClick={()=>props.setPage(2,toggle)}>
                        <NavLink>커리큘럼</NavLink>
                    </NavItem>
                    <NavItem style={{cursor:"pointer"}} onClick={()=>props.setPage(3,toggle)}>
                        <NavLink>밀당 선생님</NavLink>
                    </NavItem>
                    <NavItem style={{cursor:"pointer"}} onClick={()=>props.setPage(4,toggle)}>
                        <NavLink>수강 후기</NavLink>
                    </NavItem>
                    <NavItem style={{cursor:"pointer"}} onClick={()=>props.setPage(5,toggle)}>
                        <NavLink>찾아오는 길</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    </div>
  );
}

export default NavBar;