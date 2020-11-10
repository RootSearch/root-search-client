class ResultView {
  static __intervalTime__ = 100;
  constructor() {
    this.pivot = 0;
    this.isDrawing = false;
    this.nodeLayer = $(
      "#root-context > #result-container > #result-body > #node-layer"
    );
    this.modalLayer = $(
      "#root-context > #result-container > #result-body > #modal-layer"
    );
    this.intervalId = null;
    this.queue = [];
    this.nodes = {};
  }
  linkObject = (view, map) => {
    this._view = view;
    this._controller = view.controller;
    this._map = map;
  };

  addEventHandler = (eventHandlers) => {
    this.onClickResultHandler = eventHandlers["click-result"];
    this.onRemoveResultHandler = eventHandlers["remove-result"];
    this.onRestoreResultHandler = eventHandlers["restore-result"];
    this.mapRemovePosition = eventHandlers["remove-position"];
    this.mapRestorePosition = eventHandlers["restore-position"];
    this.onStopHandler = eventHandlers["stop-search"];
  };

  update = (data) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element.modified) {
          this._update(key, element.data);
          element.modified = false;
        }
      }
    }
  };

  _update = (name, data) => {
    switch (name) {
      case "results":
        if (data.container.length === this.pivot) this._refresh(data);
        else this._enqueue(data);
        break;
      case "result-layer":
        this._clear(data);
        break;
      default:
    }
  };

  _reset = () => {
    this._map.reset();
    this.nodeLayer.empty();
    this.modalLayer.empty();
    this.queue = [];
    this.nodes = {};
    this.pivot = 0;
  };

  _clear = ({ mode }) => {
    if (mode === "search") {
      this._reset();
      this.intervalId = this._stop(this.intervalId);
    }
    if (mode === "root") {
      this.intervalId = this._start(this.intervalId);
    }
  };

  _refresh = ({ container }) => {
    const target = container.filter(
      (element) => element.valid !== this.nodes[element.id]?.valid
    );
    const restore = [];
    const remove = [];
    target.forEach((element) => {
      const position = this.nodes[element.id]?.update(element.valid);
      if (!position) return;
      if (element.valid) restore.push(position);
      else remove.push(position);
    });
    if (remove.length > 0) this._map.restore(remove);
    if (restore.length > 0) this._map.remove(restore);
  };

  _enqueue = ({ container }) => {
    this.queue = this.queue.concat(container.slice(this.pivot));
    this.pivot = container.length;
  };

  _start = (intervalId) => {
    if (intervalId) return;
    this.isDrawing = true;
    return this._draw();
  };
  _stop = (intervalId) => {
    if (!intervalId) return;
    this.isDrawing = false;
    clearInterval(intervalId);
    return null;
  };

  _draw = () => {
    const intervalId = setInterval(() => {
      if (this.queue.length === 0) return;
      const element = this.queue.shift();
      const [position, index] = this._map.getNextPosition();
      if (!position) {
        if (this.isDrawing) {
          this._stop(this.intervalId);
          this.onStopHandler();
        }
        return;
      }
      const node = new CoffeeNode(position, element, index, {
        leftClick: this.onClickResultHandler(element.link),
        remove: this.onRemoveResultHandler(element.keyword),
        restore: this.onRestoreResultHandler(element.keyword),
      });
      this.nodes[element.id] = node;
    }, ResultView.__intervalTime__);
    return intervalId;
  };
}
