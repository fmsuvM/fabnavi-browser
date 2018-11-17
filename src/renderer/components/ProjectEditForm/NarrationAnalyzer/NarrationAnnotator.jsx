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
        '次に鳥の花を紙コップに書いてきますと書く山菜は油性のマッキーとかが好ましいですこんなふうに俺の顔書き込みました',
        '別にコマンドをコピーとしてきます喉の下の方にこういう風に魂を作って',
        'レッドワゴンを結んで行くんですが16番だと難しいので皆さんが使用するときは18番目しますとさし指ではこのように玉を作ります',
        'このように徐々に通したらちょっと穴が大きい場合は出てしまうのでマスキングテープで裏技と表を詰めてこのように簡単には取れないように接着します',
        '相手は俺のものとは短すぎるのでさらに後から追加で上には本を接続していきますのでいいと思います',
        ' 完成した紙コップと言われて引き伸ばしています夏休みの自由工作にいかがでしょうか',
        'narration 7',
        'narration 8'
      ],
      figure_tags: [
        ['鳥', '花', '紙コップ', '書く', '山菜', '油性', 'マッキー', '顔'],
        ['コマンド', 'コピー', '喉', '魂'],
        ['レッドワゴン', '結んで', '16番', 'みなさん', '指', '玉'],
        ['穴', 'マスキングテープ', '裏技', '表', '接着'],
        ['相手', '本', '接続'],
        ['完成', 'カミコップ', '夏休み', '自由工作'],
        ['tag1', 'tag2', 'tag3'],
        ['tag1', 'tag2', 'tag3'],
        ['tag1', 'tag2', 'tag3']
      ],
      split_words: [
        ['次に'],
        ['none'],
        ['none'],
        ['このように'],
        ['さらに'],
        ['none'],
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
