const isDev = true;

class Host {
    constructor() {
        // this.url = isDev ? 'http://preview.fabnavi.org' : 'http://fabnavi.org';
        this.url = isDev ? 'http://localhost:3000' : 'http://fabnavi.org';
    }
    set(url) {
        this.url = url;
    }
}

window.host = new Host();
export const host = window.host;
