import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import DetectionList from './DetectionList.jsx';
import AnnotationWords from './AnnotationWords.jsx';
import { Title, Root } from '../../../stylesheets/player/ImageSelector';
import {
  Frame,
  EditFrame,
  SubTitle,
  RequestFrame,
  AcceptButton
} from '../../../stylesheets/application/ProjectEditForm/AnnotationTool/AnnotationInterface';

const debug = Debug('fabnavi:AnnotationPlayer:AnnotationInterface');

export default class AnnotationInterface extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      figure: [
        {
          detected: [
            {
              points: [0, 0, 100, 100],
              candidate: [
                {
                  name: 'scissors',
                  confidence: 0.8
                },
                {
                  name: 'cutter',
                  confidence: 0.1
                },
                {
                  name: 'brush',
                  confidence: 0.05
                }
              ]
            },
            {
              points: [100, 100, 200, 200],
              candidate: [
                {
                  name: 'brush',
                  confidence: 0.6
                }
              ]
            }
          ],
          unknown: [
            {
              points: [0, 0, 100, 100],
              candidate: [
                {
                  name: '???',
                  confidence: 0
                }
              ]
            },
            {
              points: [100, 100, 200, 200],
              candidate: [
                {
                  name: '???',
                  confidence: 0
                }
              ]
            }
          ]
        },
        {
          detected: [
            {
              points: [0, 0, 100, 100],
              candidate: [
                {
                  name: 'scissors',
                  confidence: 0.8
                }
              ]
            },
            {
              points: [100, 100, 200, 200],
              candidate: [
                {
                  name: 'brush',
                  confidence: 0.6
                }
              ]
            }
          ],
          unknown: [
            {
              points: [0, 0, 100, 100],
              candidate: [
                {
                  name: '???',
                  confidence: 0
                }
              ]
            }
          ]
        }
      ]
    };
  }

  render() {
    return (
      <Frame>
        <Title>
          Figure{this.props.index + 1} Detection - {this.props.mode}
        </Title>
        <EditFrame>
          {this.props.mode !== 'raw' ? (
            <DetectionList data={this.state.figure[this.props.index]} mode={this.props.mode} />
          ) : (
            <div>
              <p>Annotation Mode ...</p>
            </div>
          )}
        </EditFrame>
        <RequestFrame>
          {this.props.mode !== 'raw' ? <AcceptButton>Accept</AcceptButton> : <AcceptButton>Annotation!</AcceptButton>}
        </RequestFrame>
      </Frame>
    );
  }
}
