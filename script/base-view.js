class BaseView {
  constructor() {}
  linkObject(view) {
    this._view = view;
    this._controller = view.controller;
  }

  addEventHandler(eventHandlers) {}

  update(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element.modified) {
          this._update(key, element.data);
          element.modified = false;
        }
      }
    }
  }

  _update(name, data) {
    switch (name) {
      default:
    }
  }
}
