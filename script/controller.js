class Controller {
  constructor() {}
  linkObject = (model, view, api, parser) => {
    this._model = model;
    this._view = view;
    this._api = api;
    this._parser = parser;
  };

  addEventHandler = () => {
    this._view.addEventHandler({
      "dynamic-view": {
        "search-bar": this.onChangeHandler,
        "root-button": this.onSearchHandler,
      },
    });
    this._api.addEventHandler({
      pending: "",
      success: "",
      error: "",
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

  onChangeHandler = (e) => {
    console.log($(e.target).val());
    this._model.changeModel([
      {
        view: "dynamic-view",
        object: "search-bar",
        data: { search: $(e.target).val() },
      },
    ]);
  };

  onSearchHandler = () => {
    const { mode } = this._model.readModel(
      "dynamic-view",
      "dynamic-view-group"
    );

    if (mode === "search") {
      this._model.changeModel([
        {
          view: "dynamic-view",
          object: "center-button",
          data: { mode: "falling" },
        },
        {
          view: "dynamic-view",
          object: "dynamic-view-group",
          data: { mode: "falling" },
        },
      ]);

      setTimeout(() => {
        this._model.changeModel([
          {
            view: "dynamic-view",
            object: "center-button",
            data: { mode: "root" },
          },
          {
            view: "dynamic-view",
            object: "dynamic-view-group",
            data: { mode: "root" },
          },
          {
            view: "result-view",
            object: "result-layer",
            data: { mode: "root" },
          },
        ]);
      }, 2000);
    }

    if (mode === "root") {
      this._model.changeModel([
        {
          view: "dynamic-view",
          object: "center-button",
          data: { mode: "search" },
        },
        {
          view: "dynamic-view",
          object: "dynamic-view-group",
          data: { mode: "search" },
        },
        {
          view: "result-view",
          object: "result-layer",
          data: { mode: "search" },
        },
      ]);
    }
  };
  onReceiveResultHandler = () => {
    const { mode } = this._model.readModel(
      "dynamic-view",
      "dynamic-view-group"
    );
    if (mode === "root") {
    }
  };
  BaseView_CloseOverlay = () => {
    // this._model.changeModel([
    //   { view: "base-view", object: "text-input", data: { show: false } },
    // ]);
  };
}
