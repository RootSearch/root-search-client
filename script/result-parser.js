class ResultParser {
  constructor(prototype) {
    this.prototype = prototype;
  }
  run({ KeyWord: keyword, Results: data }) {
    if (!Array.isArray(data)) return;
    return data.map((element) => ({
      valid: true,
      keyword: keyword,
      title: element[this.prototype.title],
      snippet: element[this.prototype.snippet],
      link: element[this.prototype.link],
      thumbnail: element[this.prototype.thumbnail],
    }));
  }
}
