class Controller {
  constructor() {}
  linkObject = (model, view, parser) => {
    this._model = model;
    this._view = view;
    this._parser = parser;
  };

  addEventHandler = () => {
    this._view.AddEventHandler({
      "base-view": {
        "center-button": this.BaseView_ShowOverlay,
        "go-button": this.BaseView_MakeGiftCard,
        "close-button": this.BaseView_CloseOverlay,
      },
    });
  };

  preload = (path, images) => {
    for (const key in images) {
      if (images.hasOwnProperty(key)) {
        const element = images[key];
        let image = new Image();
        image.src = path + element;
      }
    }
  };

  /**
   *  [
   *   {view : <view name>, object : <object name>, data : <new data>},
   *   ...
   *  ]
   */

  BaseView_ShowOverlay = () => {
    // $(".dynamic-view").toggleClass("search-mode root-mode");
    // $("#search-bar").toggleClass("interaction-view");
    // this._model.changeModel([
    //   { view: "base-view", object: "text-input", data: { show: true } },
    // ]);
  };
  BaseView_MakeGiftCard = () => {
    // this._view.QuickChange("base-view", "goButton");
    // let text = this._view.readModel("base-view", "code");
    // let codes = this._parser.Run(text);
    // if (codes.length === 0) {
    //   return;
    // }
    // this._model.changeModel([
    //   { view: "base-view", object: "code-book", data: codes },
    // ]);
  };
  BaseView_CloseOverlay = () => {
    // this._model.changeModel([
    //   { view: "base-view", object: "text-input", data: { show: false } },
    // ]);
  };
}
