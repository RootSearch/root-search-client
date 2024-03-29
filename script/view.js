class View {
  constructor() {}

  linkObject(controller, views) {
    this._controller = controller;
    this._views = views;
  }

  addEventHandler(eventHandlers) {
    if (eventHandlers === undefined) return;
    for (const key in eventHandlers) {
      if (eventHandlers.hasOwnProperty(key)) {
        const element = eventHandlers[key];
        this._views[key].addEventHandler(element);
      }
    }
  }

  update(model) {
    if (model === undefined) return;
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const element = model[key];
        if (element.modified) {
          this._views[key].update(element.object);
          element.modified = false;
        }
      }
    }
  }
}
