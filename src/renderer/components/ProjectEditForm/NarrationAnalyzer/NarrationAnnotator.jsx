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
        '次にペットボトルにつける草食竜の甲殻です今回は以前使ったかよしが余ってるのでこれを使っていろんな形に切ってますけど保険に入ったにペットボトルの先端を丸めるようにしてとんがり帽にしてからマスキングテープで金テープでつなぎ目を止めて被せこれに比べてしまうので後ろ向く新生児目と口をペットのように3分割4分割にこまるの半径に行きます来ない生えてきた形で広げるとまた延期になっているのでこれをあとちょっと麻生で調整して目玉っぽくなったところで勝手にしてみたかってんて中身の目玉を書いてマスキングテープ裏に貼ってペットボトルに貼り付けますこれを両面テープするのにこの家に丸めてしまってもちょっと取れてしまったので葉っぱの裏側によく行きますねこれで幽霊っぽいペットボトル何か意見が出来上がりました',
        'narration 2',
        'narration 3',
        'narration 4',
        'narration 5',
        'narration 6',
        'narration 7',
        'narration 8'
      ],
      figure_tags: [
        [
          '草食',
          'ペットボトル',
          '甲殻',
          '竜',
          '今回',
          '以前',
          '金',
          '後ろ',
          'テープ',
          'つなぎ目',
          '分割',
          'マスキング',
          '帽',
          '目',
          '新生児',
          '目',
          'ペット',
          '幽霊',
          '口'
        ],
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
        ['次に', '今回', '3番', '4分'],
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
