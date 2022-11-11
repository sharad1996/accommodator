import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './header.scss';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
//import { ReactComponent as LOGO } from '../../../assets/images/Logo.svg';
import NewModal from '../modal/Modal';
import logo from '../../../assets/images/hlogo.jpg';

const Index = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setLogin] = useState(false);
  const [modalPage, setModalPage] = useState('login');
  const toggle = () => setIsOpen(!isOpen);
  const openLoginModal = () => setLogin(!isOpenLogin);
  const setPage = type => setModalPage(type);
  const redirect = url => props.history.push(url);
  const logout = ()=>{
    localStorage.removeItem('accessToken')
    window.location.reload('/');
  };
  const token = localStorage.getItem('accessToken');
  return (
    <Container className='header-main'>
      <Navbar fixed='top' light expand='md' className='justify-content-between align-content-center bg-dark'>
        <NavbarBrand onClick={() => redirect('/')} href='javascript:void(0)'>
          {/* <LOGO /> */}
          <div className='d-flex justify-content-center'>
            <img src={logo} height={'50px'} alt={'logo'} />
            <div className='pt-1'>
              <h2><span className="white-bg">HouzzLeads</span></h2>
            </div>
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className=' align-items-center ml-auto' navbar>
            {/* <NavItem>
              <NavLink href='tel:91-798-801-5025'>91-798-801-5025</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink onClick={() => redirect('/map-search')}>leads</NavLink>
            </NavItem>
            <NavItem>
              {!token ? (
                <NavLink
                  //href='javascript:void(0)'
                  onClick={() => {
                    setPage('login');
                    openLoginModal();
                  }}
                  className='btn'
                >
                  Log in
                </NavLink>
              ) : (
                <NavLink onClick={() => redirect('/profile')}>Profile</NavLink>
              )}
            </NavItem>
              {token &&
              <NavItem>
                <NavLink onClick={()=>redirect('/plans')}>Plans</NavLink>
              </NavItem>

              }
            <NavItem>
              {!token ? (
                <NavLink
                  //href='javascript:void(0)'
                  onClick={() => {
                    setPage('signUp');
                    openLoginModal();
                  }}
                  className='btn'
                >
                  Sign Up
                </NavLink>
              ) : (
                <NavLink
                  //href='javascript:void(0)'
                  onClick={logout}
                  className='btn'
                >
                  Logout
                </NavLink>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <NewModal openLoginModal={openLoginModal} isOpenLogin={isOpenLogin} page={modalPage} />
    </Container>
  );
};

export default withRouter(Index);
