class ResultView {
  static __intervalTime__ = 200;
  static __restoreTime__ = 2500;
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
    this.nodes = new Map();
    this.keywordGroups = new Map();
    this.removeNodes = new Map();
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
    this.requestDeleteHandler = eventHandlers["request-delete"];
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
        else if (data.container.length > this.pivot) this._enqueue(data);
        else if (data.container.length < this.pivot) this._clean(data);
        break;
      case "result-layer":
        this._changeMode(data);
        break;
      case "draw-state":
        this._changeState(data);
        break;
      default:
    }
  };

  _reset = () => {
    this._map.reset();
    this.nodeLayer.empty();
    this.modalLayer.empty();
    this.nodes.clear();
    this.keywordGroups.clear();
    this.removeNodes.clear();
    this.queue = [];
    this.pivot = 0;
  };

  _changeState = ({ state }) => {
    if (state === "running") this.intervalId = this._start(this.intervalId);
    if (state === "pending");
    if (state === "idle") this.intervalId = this._stop(this.intervalId);
  };

  _changeMode = ({ mode }) => {
    if (mode === "search") this._reset();
    if (mode === "root");
  };

  _refresh = ({ container }) => {
    const target = container.filter(
      (element) => element.valid !== this.nodes.get(element.id)?.valid
    );
    const restore = [];
    const remove = [];
    target.forEach((element) => {
      const position = this.nodes.get(element.id)?.update(element.valid);
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

  _clean = ({ container }) => {
    this.nodes.forEach((node, id) => {
      if (node.valid) return;
      node.remove();
      this.nodes.delete(id);
    });
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

  _removeNodes = (keyword) => {
    // do this function just one time for each keywords
    if (this.removeNodes.has(keyword)) return;

    // pre remove nodes by keywords
    this.onRemoveResultHandler(keyword);
    this.queue = this.queue.map((node) =>
      keyword === node.keyword ? { ...node, valid: false } : node
    );

    // ready to delete request
    this.removeNodes.set(
      keyword,
      setTimeout(() => {
        this.keywordGroups.get(keyword).forEach((node) => node.remove());
        this.keywordGroups.delete(keyword);
        this.removeNodes.delete(keyword);
        this.requestDeleteHandler(keyword);
      }, ResultView.__restoreTime__)
    );
  };

  _restoreNodes = (keyword) => {
    // do this function just one time for each keywords
    if (!this.removeNodes.has(keyword)) return;

    // restore reomved nodes
    this.onRestoreResultHandler(keyword);
    this.queue = this.queue.map((node) =>
      keyword === node.keyword ? { ...node, valid: true } : node
    );

    // cancle delete request
    clearInterval(this.removeNodes.get(keyword));
    this.removeNodes.delete(keyword);
  };

  _draw = () => {
    const intervalId = setInterval(() => {
      if (this.queue.length === 0) return;
      let element = this.queue.shift();
      while (!element.valid) {
        element = this.queue.shift();
        if (!element) return;
      }
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
        remove: () => this._removeNodes(element.keyword),
        restore: () => this._restoreNodes(element.keyword),
      });
      this.nodes.set(element.id, node);
      if (this.keywordGroups.has(element.keyword))
        this.keywordGroups.get(element.keyword).push(node);
      else this.keywordGroups.set(element.keyword, [node]);
    }, ResultView.__intervalTime__);
    return intervalId;
  };
}
