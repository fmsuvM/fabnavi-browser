import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import Player from './Player';
import DeleteModal from '../components/DeleteModal';
import CaptionList from './CaptionList';
import { searchRelatedProjects } from '../actions/manager';

import { sanitizeProject } from '../utils/projectUtils';

import {
  StyledDetailFrame,
  ProjectTitle,
  ContentsFrame,
  DescriptionFrame,
  StyledHead,
  StyledDescription,
  StatusFrame,
  StatusText,
  PrivateNotation,
  TagFrame,
  TagHeader,
  TagField,
  StyledTagName,
  RelatedProjectFrame,
  FramePerTag,
  TopTag
} from '../stylesheets/application/ProjectShow/StyledProjectDetail';

const debug = Debug('fabnavi:jsx:ProjectDetail');
const RelatedProjects = lazy(() => import('./ProjectDetail/RelatedProjects'));

export class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: '2018' // TODO: API側でタグを複数検索できるようにする
    };

    this.searchRelatedProjects = () => {
      this.props.searchRelatedProjects(this.state.tag);
    };
  }

  componentDidMount() {
    this.searchRelatedProjects();
  }

  render() {
    if(!this.props.project) return <div />;
    const project = sanitizeProject(this.props.project);
    const isPrivate = project.private;
    const tags = project.tags.tags;
    const isTag = tags.length > 0 ? true : false;
    const loadingRelatedProjects = <div>なうろーでぃんぐ</div>;
    const relatedProjects = (
      <Suspense fallback={loadingRelatedProjects}>
        <RelatedProjects projects={this.props.relatedProjects} tag={this.state.tag} />
      </Suspense>
    );
    return (
      <div>
        {project ? (
          <StyledDetailFrame>
            <ProjectTitle lang="ja">
              {project.name} {isPrivate && <PrivateNotation>Private Project</PrivateNotation>}
            </ProjectTitle>
            <TagFrame>
              <TagHeader>Tag: </TagHeader>
              <TagField>
                {isTag ? (
                  tags.map((tag, index) => {
                    return <StyledTagName key={index}>{tag.name}</StyledTagName>;
                  })
                ) : (
                  <TagHeader>none</TagHeader>
                )}
              </TagField>
            </TagFrame>
            <Player />
            <ContentsFrame>
              <DescriptionFrame>
                <StyledHead>Description</StyledHead>
                <StyledDescription>{project.description}</StyledDescription>
              </DescriptionFrame>
              <StatusFrame>
                <StyledHead>Author</StyledHead>
                <StatusText>{project.user.nickname}</StatusText>
                <StyledHead>Created Date</StyledHead>
                <StatusText>{project.date}</StatusText>
              </StatusFrame>
            </ContentsFrame>
            <CaptionList
              figures={project.content
                .map(content => content.figure)
                .sort((fig1, fig2) => fig1.position - fig2.position)}
              contentType={this.props.contentType}
            />
            <RelatedProjectFrame>
              <StyledHead>Related Projects</StyledHead>
              <FramePerTag>
                <TopTag>2018</TopTag>
                {relatedProjects}
              </FramePerTag>
            </RelatedProjectFrame>
            {this.props.showDeleteConfirmation ? <DeleteModal /> : <span />}
          </StyledDetailFrame>
        ) : (
          <div> loading project... </div>
        )}
      </div>
    );
  }
}

ProjectDetail.propTypes = {
  project: PropTypes.object,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userIsAdmin: PropTypes.bool,
  showDeleteConfirmation: PropTypes.bool,
  targetProject: PropTypes.number,
  contentType: PropTypes.string,
  searchRelatedProjects: PropTypes.func,
  relatedProjects: PropTypes.object
};

export const mapStateToProps = state => ({
  project: state.manager.targetProject,
  userId: state.user.id,
  userIsAdmin: state.user.isAdmin,
  showDeleteConfirmation: state.modals.showDeleteConfirmation,
  targetProject: state.modals.targetProject,
  contentType: state.player.contentType,
  relatedProjects: state.manager.relatedProjects
});

const mapDispatchToProps = dispatch => ({
  searchRelatedProjects: query => {
    dispatch(searchRelatedProjects(query));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);
