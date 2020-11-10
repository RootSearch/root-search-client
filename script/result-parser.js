class ResultParser {
  constructor(prototype) {
    this.prototype = prototype;
  }
  run(data) {
    if (!Array.isArray(data)) return;
    return data.map((element) => ({
      title: element[this.prototype.title],
      snippet: element[this.prototype.snippet],
      link: element[this.prototype.link],
      thumbnail: element[this.prototype.thumbnail],
    }));
  }
}
