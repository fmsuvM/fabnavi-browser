import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import RecommendTags from './RecommendTags.jsx';
import StepSpliter from './StepSpliter.jsx';

import { requestTranscription } from '../../../actions/analyzer';

import { Title, Root } from '../../../stylesheets/player/ImageSelector';
import {
  NarrationWrapper,
  NarrationField,
  SubTitle,
  AnalyzeButton
} from '../../../stylesheets/application/ProjectEditForm/NarrationAnnotator/NarrationAnnotator';

const debug = Debug('fabnavi:NarrationAnalyzer:NarrationAnnotator');

class NarrationAnnotator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      figure_tags: [
        ['tag1', 'tag2', 'tag3gg', 'tag3gg'],
        ['tagg1', 'tag2g', 'tag3gg'],
        ['aaaa', 'tag2', 'tag3'],
        ['bbbb', 'tag2', 'tag3'],
        ['cccc', 'tag2', 'tag3'],
        ['tag1', 'tag2', 'tag3'],
        ['tag1', 'tag2', 'tag3'],
        ['tag1', 'tag2', 'tag3'],
        ['tag1', 'tag2', 'tag3']
      ]
    };

    this.onSplitButtonClick = e => {
      e.preventDefault();
      debug('split!');
    };

    this.onAcceptButtonClick = e => {
      e.preventDefault();
      debug('accept!');
    };

    this.onRequestTranscription = e => {
      e.preventDefault();
      this.props.requestTranscription(this.props.figures[this.props.index].source, this.props.index);
    };
  }

  handleChangeNarrationTag(e, index, figureIndex) {
    this.changeNarrationTag(e.target.value, index, figureIndex);
  }

  changeNarrationTag(tagName, tagIndex, figureIndex) {
    const update = this.state.figure_tags[figureIndex]
      .sort((a, b) => a.position - b.position)
      .map((tag, index) => {
        if(index !== figureIndex) return tag;
        tag = tagName;
        return tag;
      });
    const stateCopy = this.state.figure_tags.slice();
    stateCopy[figureIndex] = update;
    this.setState({
      figure_tags: stateCopy
    });
  }

  render() {
    const figure = this.props.figures[this.props.index];
    return (
      <NarrationWrapper>
        <Title>Figure{this.props.index + 1} Narration </Title>
        {!this.props.isFetching ? (
          !Object.keys(figure.transcription).length ? (
            <NarrationField defaultValue="Please click analyze button" />
          ) : (
            <NarrationField value={figure.transcription.narration} />
          )
        ) : (
          <div>
            <p>now loading...</p>
          </div>
        )}
        {/* <NarrationField value={this.state.narration[this.props.index]} /> */}
        <SubTitle>Tags from Analized Narration</SubTitle>
        {!this.props.isFetching ? (
          !Object.keys(figure.transcription).length ? (
            <AnalyzeButton onClick={e => this.onRequestTranscription(e)}>Analyze</AnalyzeButton>
          ) : (
            <RecommendTags
              tags={figure.transcription.words}
              onChange={this.handleChangeNarrationTag.bind(this)}
              onClick={this.onAcceptButtonClick}
              figureIndex={this.props.index}
            />
          )
        ) : (
          <div>
            <p>now loading...</p>
          </div>
        )}
        {/* <SubTitle>Split Position from Analized Narration</SubTitle>
        <StepSpliter words={this.state.split_words[this.props.index]} onClick={this.onSplitButtonClick} /> */}
      </NarrationWrapper>
    );
  }
}

NarrationAnnotator.propTypes = {
  narration: PropTypes.string,
  index: PropTypes.number
};

const mapStateToProps = state => ({
  isFetching: state.analyzer.isFetching,
  figures: state.analyzer.figures
});

const mapDispatchToProps = dispatch => ({
  requestTranscription: (url, index) => {
    debug('request API: ', url);
    dispatch(requestTranscription(url, index));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NarrationAnnotator);
