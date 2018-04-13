import React, { Component } from 'react';
import './Header.css';


class Header extends Component {
  render() {
    return (
      <nav className="application-header">
        {/*<Link className="ripple" id="logo-svg" to={Paths.base}>
          <SvgLogo text="Erza" />
        </Link>*/}
        <div className="flex-spacer" />
        <h1>ERZA</h1>
        <div className="flex-spacer" />
        <div id="navigation-links">
          {/*<AppSettings />*/}
        </div>
      </nav>
    );
  }
}

export default Header;
