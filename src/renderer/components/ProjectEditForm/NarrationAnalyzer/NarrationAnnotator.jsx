import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import RecommendTags from './RecommendTags.jsx';
import StepSpliter from './StepSpliter.jsx';

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
      narration: [
        'narration 1',
        'narration 2',
        'narration 3',
        'narration 4',
        'narration 5',
        'narration 6',
        'narration 7',
        'narration 8'
      ],
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
      ],
      split_words: [
        ['tag1', 'tag2', 'tagaagag', 'tag3gg'],
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
  }

  handleChangeNarrationTag(e, index, figureIndex) {
    // event, tagのinde, 図のindex
    this.changeNarrationTag(e, index, figureIndex);
  }

  changeNarrationTag(tag, tagIndex, figureIndex) {
    debug('event: ', tag);
    this.setState({
      split_words: this.state.split_words[figureIndex].map((value, index) => {
        if(index !== tagIndex) return value;
        value[index] = tag;
        return value;
      })
    });
  }

  render() {
    return (
      <NarrationWrapper>
        <Title>
          Figure{this.props.index + 1} Narration <AnalyzeButton>Analyze</AnalyzeButton>
        </Title>
        <NarrationField value={this.state.narration[this.props.index]} />
        <SubTitle>Tags from Analized Narration</SubTitle>
        <RecommendTags
          tags={this.state.figure_tags[this.props.index]}
          onChange={this.handleChangeNarrationTag.bind(this)}
          onClick={this.onAcceptButtonClick}
          figureIndex={this.props.index}
        />
        <SubTitle>Split Position from Analized Narration</SubTitle>
        <StepSpliter words={this.state.split_words[this.props.index]} onClick={this.onSplitButtonClick} />
      </NarrationWrapper>
    );
  }
}

NarrationAnnotator.propTypes = {
  narration: PropTypes.string,
  index: PropTypes.number
};

export default NarrationAnnotator;
