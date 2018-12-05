import axios from 'axios';
import Debug from 'debug';
import qs from 'qs';
import 'babel-polyfill';

const debug = Debug('fabnavi:api:analyzer');

const host = 'http://192.168.100.32:5000/analyze';

class Server {
  constructor() {
    this.dispatch = null;
    this.store = null;
  }

  init(store) {
    this.dispatch = store.dispatch;
    this.store = store;
  }

  // for object detetion
  async requestObjectDetection(filename, index) {
    debug('request object detection: ', filename);
    debug('detection figure number: ', index);
    const url = `${host}/detection`;
    return axios({
      responseType: 'json',
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        movie_url: filename
      }
    });
  }

  // for analyze narration
  async requetTranscription(filename) {
    debug('request narration transcription: ', filename);
    const url = `${host}/narration`;
    return axios({
      responseType: 'json',
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        movie_url: filename
      }
    });
  }
}

const mlAPI = new Server();
export default mlAPI;
