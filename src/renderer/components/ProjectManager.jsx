import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import LeftNav from './Navigation/LeftNav.jsx';
import RightNav from './Navigation/Rightnav.jsx';
import CenterNav from './Navigation/CenterNav.jsx';
import Footer from './Footer.jsx';
import BackButton from './BackButton.jsx';
import NextPageButton from './PaginatorButton/NextPageButton.jsx';
import PrevPageButton from './PaginatorButton/PrevPageButton.jsx';
import ProjectSettings from './ProjectSettings.jsx';

import {
  PageFrame,
  LeftFrame,
  CenterFrame,
  RightFrame,
  NavFrame,
  ContentsFrame,
  FooterFrame
} from '../stylesheets/application/share/Frames';

const debug = Debug('fabnavi:jsx:ProjectManager');

export default class ProjectManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="body" style={{ background: 'white' }}>
          <PageFrame>
            <NavFrame>
              <LeftFrame>
                <LeftNav />
              </LeftFrame>
              <CenterFrame>
                <CenterNav />
              </CenterFrame>
              <RightFrame>
                <RightNav />
              </RightFrame>
            </NavFrame>
            <ContentsFrame>
              <LeftFrame>
                <PrevPageButton />
                <BackButton />
              </LeftFrame>
              <CenterFrame>{this.props.children}</CenterFrame>
              <RightFrame>
                <NextPageButton />
                <ProjectSettings />
              </RightFrame>
            </ContentsFrame>
            <FooterFrame>
              <LeftFrame>
                <Footer />
              </LeftFrame>
              <CenterFrame>
                <span />
              </CenterFrame>
              <RightFrame>
                <span />
              </RightFrame>
            </FooterFrame>
          </PageFrame>
        </div>
      </div>
    );
  }
}

ProjectManager.propTypes = {
  children: PropTypes.element
};
