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
    this.nodes = [];
  }
  linkObject = (view, map) => {
    this._view = view;
    this._controller = view.controller;
    this._map = map;
  };

  addEventHandler = (eventHandlers) => {
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
        this._enqueue(data);
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
        click: () => window.open(element.link, "_blank").focus(),
      });
      this.nodes.push(node);
    }, ResultView.__intervalTime__);
    return intervalId;
  };
}
