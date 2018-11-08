# fabnavi-browser

- Fabnavi のブラウザ版．Chrome でのみ動作確認．
  - Host Server は Preview に固定

## Requirement

- Node.js
  - latest
- Google Chrome

## Setup

```sh
$ git clone https://github.com/fmsuvM/fabnavi-browser.git
$ cd fabnavi-browser
$ npm install
```

## Development

```sh
$ npm run compile
# 止めるときは Ctrl + C
```

## Release

未定．Netlify にする予定．production compile は webpack．

## Command

|      Command       |                                 Description                                  |
| :----------------: | :--------------------------------------------------------------------------: |
| `npm run compile`  | webpack-dev-server が起動してコ ー ドをコンパイルする．localhost:3001 で起動 |
|   `npm run lint`   |   ESLint を用いてコ ー ドを静的にチェックし、結果をコンソ ー ルに表示する    |
| `npm run lint:fix` |  ESLint を用いてコ ー ドを静的にチェックし、修正可能なものは修正してくれる   |
|   `npm run dist`   |                         production compile（未実装）                         |
