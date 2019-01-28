import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UserInfo from './UserInfo';
import Nav from './Nav';
import { getCurrentProject } from "./../../utils/storage";

class SideBar extends Component {

  state = {};

  render() {
    let {
      backgroundColor,
      enableBackgroundImage,
      backgroundImage
    } = this.props;
    const project = getCurrentProject() || 'tics';
    const logoUrl = `https://res.cloudinary.com/jrx4/image/upload/v1548688770/new.${project}.jpg`;
    return (
      <div className="sidebar" data-color={backgroundColor} data-image={backgroundImage}>
        <div className="brand">
          <img src={logoUrl} alt="logo" className="logo" />
        </div>

        <div className="sidebar-wrapper">
          <UserInfo />
          <div className="line"><hr /></div>
          <Nav />
        </div>
        <div
          className="sidebar-background"
          style={{
            backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
          }}>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
  backgroundColor: state.ThemeOptions.backgroundColor,
  backgroundImage: state.ThemeOptions.backgroundImage
});

export default withRouter(
  connect(mapStateToProps)(SideBar)
);