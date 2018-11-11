import Debug from 'debug';

const debug = Debug('fabnavi:ProjectEditForm:FigureAnnotation');

export default class FigureAnnotation {
  constructor(canvasElement) {
    this.currentImage = null;
    this.reset();
    this.cvs = canvasElement;
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = this.width = screen.width;
    this.cvs.height = this.height = screen.height;
    this.clear();
  }

  clear() {
    debug('clear');
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  reset() {
    if(this.ctx != null)this.clear();
    this.currentImage = null;
    this.ctx = null;
    this.cvs = null;
  }

  redraw() {
    debug('redraw');
    this.clear();
    if(this.currentImage)this.draw(this.currentImage);
  }

  draw(img, conf, cvs, ctx) {
    if(!cvs) {
      cvs = this.cvs;
    }
    if(!ctx) {
      ctx = cvs.getContext('2d');
    }

    this._draw(img, conf, cvs, ctx);
    this.currentImage = img;
    this.conf = conf;
  }

  drawMessage(x, y) {
    this.ctx.fillStyle = 'green';
    this.ctx.font = '100px ArialRoundedMTBoldBold, serif';
    this.ctx.fillText('testtest', x || 0, y || 20);
  }

  _draw(img, conf, cvs, ctx) {
    if(!conf && this.conf) {
      conf = this.conf;
    }
    /* set cropping area on image  */
    const sx = Number(conf.x) || 0,
        sy = Number(conf.y) || 0,
        sw = Number(conf.w),
        sh = Number(conf.h),
        /* set project area */
        dx = 0,
        dy = 0,
        dw = cvs.width,
        dh = (dw * sh) / sw;

    ctx.save();
    ctx.fillStyle = 'black';
    ctx.drawImage(img, 0, 0, dw, dh);
    ctx.restore();
  }

  drawRect(x, y, w, h, color) {
    this.redraw();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }
}
