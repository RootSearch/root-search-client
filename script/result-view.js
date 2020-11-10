class ResultView {
  constructor() {
    this.pivot = 0;
    this.nodeLayer = $(
      "#root-context > #result-container > #result-body > #node-layer"
    );
    this.modalLayer = $(
      "#root-context > #result-container > #result-body > #modal-layer"
    );
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
        this._drawNode(data);
        break;
      case "result-layer":
        this._clear(data);
        break;
      default:
    }
  };

  _clear = (data) => {
    console.log(data);
    if (data.mode === "search") {
      this.nodeLayer.empty();
      this.modalLayer.empty();
      this.pivot = 0;
    }
    if (data.mode === "root") {
      this.nodeLayer.empty();
      this.modalLayer.empty();
      this.pivot = 0;
    }
  };

  _drawNode = ({ container }) => {
    container.slice(this.pivot).forEach((element) => {
      const [position, index] = this._map.getNextPosition();
      if (!position) {
        this.onStopHandler();
        return;
      }
      const node = new CoffeeNode(position, element, index, {
        click: () => window.open(element.link, "_blank").focus(),
      });
      this.nodes.push(node);
    });
    this.pivot = container.length;
  };
}
