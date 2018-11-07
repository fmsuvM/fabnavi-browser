import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { TagView } from '../../stylesheets/application/visualizer/TagPerStep';
import { StyledTagName } from '../../stylesheets/application/ProjectShow/StyledProjectDetail';

const debug = Debug('fabnavi:visualizer:TagPerStep');

export default class TagPerStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stepTag: [
        {
          id: 0,
          tag: ['ボールペン', '紙コップ']
        },
        {
          id: 1,
          tag: ['厚紙', 'ハサミ']
        },
        {
          id: 2,
          tag: ['輪ゴム']
        },
        {
          id: 3,
          tag: ['輪ゴム', '紙コップ']
        },
        {
          id: 4,
          tag: ['紙コップ', 'マスキングテープ']
        },
        {
          id: 5,
          tag: ['遊び方', '完成', '夏休み', '宿題']
        }
      ]
    };
  }

  render() {
    const tags = this.state.stepTag;
    return (
      <TagView>
        {tags[this.props.currentStep]['tag'].map((tag, index) => (
          <StyledTagName key={index}>{tag}</StyledTagName>
        ))}
      </TagView>
    );
  }
}

TagPerStep.propTypes = {
  currentStep: PropTypes.number
};
