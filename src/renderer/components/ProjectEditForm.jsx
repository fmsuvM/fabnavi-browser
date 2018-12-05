import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';

import { updateProject } from '../actions/manager';

import Player from './Player.jsx';
import CaptionsField from './ProjectEditForm/CaptionsField.jsx';
import TagField from './ProjectEditForm/TagField.jsx';
import FiguresTagField from './ProjectEditForm/FiguresTagField.jsx';
import AnnotationPlayer from './ProjectEditForm/AnnotationPlayer.jsx';
import NarrationAnalyzer from './ProjectEditForm/NarrationAnalyzer.jsx';

import {
  EditPage,
  PageTitle,
  EditCaption,
  InputTitle,
  InputPrivate,
  DescriptionFieldWrapper,
  DescriptionField,
  SaveButton,
  EditTarget,
  AddTagButton
} from '../stylesheets/application/ProjectEditForm';

const debug = Debug('fabnavi:jsx:ProjectEditForm');

export class ProjectEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = e => {
      e.preventDefault();
      const figures = this.state.figures.map(figure => {
        const captions = figure.captions.filter(caption => caption.text && !!caption.text.trim());
        figure.captions = captions;
        return figure;
      });
      this.props.updateProject(
        Object.assign({}, this.props.project, {
          name: this.state.name,
          tag_list: this.state.tag_list,
          description: this.state.description,
          private: this.state.private,
          figures: figures
        })
      );
    };

    this.handleNameChange = e => {
      this.setState({ name: e.target.value });
    };

    this.handlePublishStatusChange = e => {
      this.setState({ private: e.target.value });
    };

    this.handleDescriptionChange = e => {
      this.setState({ description: e.target.value });
    };

    this.changeCaptions = debounce(500, this.changeCaptions);

    this.onAddCaptionButtonClick = e => {
      e.preventDefault();
      const index = parseInt(e.target.dataset.index, 10);
      if(!this.state.figures) return;
      const currentTime = this.player.getWrappedInstance().getCurrentTime();
      this.setState({
        figures: this.state.figures
          .sort((a, b) => a.position - b.position)
          .map((figure, i) => {
            if(i !== index) return figure;
            figure.captions.push({
              id: null,
              start_sec: currentTime,
              end_sec: currentTime,
              text: ''
            });
            return figure;
          })
      });
    };

    this.onAddFigureTagButton = e => {
      e.preventDefault();
      const index = parseInt(e.target.dataset.index, 10);
      this.setState({
        figures: this.state.figures
          .sort((a, b) => a.position - b.position)
          .map((figure, i) => {
            if(i !== index) return figure;
            figure.step_tags.push({
              id: null,
              step_tag: ''
            });
            return figure;
          })
      });
    };

    this.onDeleteFigureTagButton = (e, figureIndex, tagIndex) => {
      e.preventDefault();
      this.setState({
        figures: this.state.figures
          .sort((a, b) => a.position - b.position)
          .map((figure, i) => {
            if(i !== figureIndex) return figure;
            figure.step_tags.splice(tagIndex, 1);
            return figure;
          })
      });
    };

    this.onAddTagButtonClick = e => {
      e.preventDefault();
      this.state.tag_list.push('');
      this.setState({
        tag_list: this.state.tag_list
      });
    };

    this.handleTagNameChange = (e, index) => {
      this.state.tag_list[index] = e.target.value;
      this.setState({
        tag_list: this.state.tag_list
      });
    };

    this.onDeleteTgButtonClick = (e, index) => {
      e.preventDefault();
      this.state.tag_list.splice(index, 1);
      this.setState({
        tag_list: this.state.tag_list
      });
    };

    this.updatePlayer = figures => {
      const content = this.state.project.content.map((cont, i) => {
        cont.figure = figures[i];
        return cont;
      });
      const project = Object.assign({}, this.props.project, {
        content: content
      });
      this.setState({ project: project });
    };

    this.state = {
      project: this.props.project,
      name: '',
      tag_list: [],
      description: '',
      private: false,
      figures: [],
      captions: []
    };
  }

  handleFigureTagName(e, figureIndex, tagIndex) {
    this.changeFigureTagName(e.target.value, figureIndex, tagIndex);
  }

  changeFigureTagName(name, figureIndex, tagIndex) {
    this.setState({
      figures: this.state.figures
        .sort((a, b) => a.position - b.position)
        .map((figure, i) => {
          if(i !== figureIndex) return figure;
          figure.step_tags[tagIndex].step_tag = name;
          return figure;
        })
    });
  }

  handlerCaptionsChange(e) {
    this.changeCaptions(e.nativeEvent);
  }

  changeCaptions(e) {
    const li = e.target.parentNode;
    const figureIndex = parseInt(li.dataset.figureIndex, 10);
    const captionIndex = parseInt(li.dataset.index, 10);
    const name = e.target.name;
    const figures = this.state.figures.map((figure, i) => {
      if(i !== figureIndex) return figure;
      const caption = figure.captions[captionIndex];
      if(name === 'text') {
        caption[name] = e.target.value;
      } else if(name === '_destroy') {
        caption[name] = e.target.checked;
      } else {
        caption[name] = isNaN(e.target.valueAsNumber) ? 0 : parseInt(e.target.valueAsNumber, 10) / 1000;
      }
      return figure;
    });
    this.setState({ figures: figures });
    this.updatePlayer(figures);
  }

  handleThumbnailDeleteButtonClick(e) {
    e.stopPropagation();
    this.changeFigureState(e.nativeEvent);
  }

  handleThumbanailOrderChange(figures) {
    const content = this.props.project.content.map((cont, i) => {
      cont.figure = figures[i];
      return cont;
    });

    const project = Object.assign({}, this.state.project, {
      content: content
    });

    this.setState({
      project: project,
      figures: figures
    });
  }

  changeFigureState(e) {
    const thumbnail = e.target.parentNode;
    const figureIndex = parseInt(thumbnail.dataset.index, 10);
    const figures = this.state.figures.map((figure, i) => {
      if(i !== figureIndex) return figure;
      figure._destroy = !figure._destroy;
      return figure;
    });
    this.setState({ figures: figures });
  }

  componentWillReceiveProps(props) {
    if(props.project !== null) {
      this.setState({
        name: props.project.name,
        tag_list: props.project.tags.tags.map(tag => tag.name),
        description: props.project.description,
        private: props.project.private,
        figures: props.project.content
          .map(content => {
            const figure = content.figure;
            figure.captions = figure.captions.sort((a, b) => a.start_sec - b.start_sec);
            return figure;
          })
          .sort((a, b) => a.position - b.position),
        captions: props.project.content[0].figure.captions.sort((a, b) => a.start_sec - b.start_sec)
      });
    }
  }

  render() {
    const project = this.props.project;
    const isTag = this.state.tag_list.length > 0;
    const tagList = this.state.tag_list;
    return (
      <div>
        <EditPage>
          <PageTitle>Project Editor</PageTitle>
          {project && project.content ? (
            <form onSubmit={this.onSubmit}>
              <div>
                <EditTarget>Project Name</EditTarget>
                <InputTitle onChange={this.handleNameChange} value={this.state.name} type="text" />
              </div>

              <div>
                <EditTarget>Privacy Settings</EditTarget>
                <div>
                  <InputPrivate
                    onChange={this.handlePublishStatusChange}
                    type="radio"
                    value={true}
                    name="private"
                    defaultChecked={project.private}
                  />
                  <label>
                    This project is <span style={{ textDecoration: 'underline' }}>Private</span>. Only you can see this
                    project.
                  </label>
                </div>
                <div>
                  <InputPrivate
                    onChange={this.handlePublishStatusChange}
                    type="radio"
                    value={false}
                    name="private"
                    defaultChecked={!project.private}
                  />
                  <label>
                    This project is <span style={{ textDecoration: 'underline' }}>Public</span>. Anyone can see this
                    project.
                  </label>
                </div>
              </div>

              <EditTarget>Edit Caption</EditTarget>
              <EditCaption>
                <Player
                  project={this.state.project}
                  size="small"
                  isEditable={true}
                  handleThumbnailDeleteButtonClick={this.handleThumbnailDeleteButtonClick.bind(this)}
                  handleThumbanailOrderChange={this.handleThumbanailOrderChange.bind(this)}
                  ref={instance => (this.player = instance)}
                />
                <CaptionsField
                  figures={this.state.figures}
                  contentType={project.content[0].type === 'Figure::Frame' ? 'movie' : 'photo'}
                  handleCaptionsChange={this.handlerCaptionsChange.bind(this)}
                  onAddCaptionButtonClick={this.onAddCaptionButtonClick}
                />
              </EditCaption>

              <EditTarget>Object Detection</EditTarget>
              <AnnotationPlayer
                project={this.state.project}
                size="small"
                isEditable={true}
                handleThumbnailDeleteButtonClick={this.handleThumbnailDeleteButtonClick.bind(this)}
                handleThumbanailOrderChange={this.handleThumbanailOrderChange.bind(this)}
                ref={instance => (this.player = instance)}
              />

              <EditTarget>Narration Analyze</EditTarget>
              <NarrationAnalyzer
                project={this.state.project}
                size="small"
                isEditable={true}
                handleThumbnailDeleteButtonClick={this.handleThumbnailDeleteButtonClick.bind(this)}
                handleThumbanailOrderChange={this.handleThumbanailOrderChange.bind(this)}
                ref={instance => (this.player = instance)}
              />

              <div>
                <EditTarget>Tag List per figure</EditTarget>
                <FiguresTagField
                  figures={this.state.figures}
                  handleFigureTagChange={this.handleFigureTagName.bind(this)}
                  onAddFigureTagButton={this.onAddFigureTagButton}
                  onDeleteFigureTagButton={this.onDeleteFigureTagButton}
                />
              </div>
              <DescriptionFieldWrapper>
                <EditTarget>Description</EditTarget>
                <DescriptionField onChange={this.handleDescriptionChange} value={this.state.description} rows="10" />
              </DescriptionFieldWrapper>
              <SaveButton type="submit" onClick={this.onSubmit}>
                save
              </SaveButton>
            </form>
          ) : (
            <div> loading project... </div>
          )}
        </EditPage>
      </div>
    );
  }
}

ProjectEditForm.propTypes = {
  project: PropTypes.object,
  updateProject: PropTypes.func
};

export const mapStateToProps = state => ({
  project: state.manager.targetProject
});

export const mapDispatchToProps = dispatch => ({
  updateProject: project => dispatch(updateProject(project))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectEditForm);
