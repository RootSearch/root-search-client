class Controller {
  constructor() {}
  ObjectLinker = (model, view, parser) => {
    this._model = model;
    this._view = view;
    this._parser = parser;
  };

  AddEventHandler = () => {
    this._view.AddEventHandler({
      "base-view": {
        "center-button": this.BaseView_ShowOverlay,
        "go-button": this.BaseView_MakeGiftCard,
        "close-button": this.BaseView_CloseOverlay,
      },
    });
  };

  Preload = (path, images) => {
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

    // setTimeout(() => {
    //   let result = new ResultMap();
    //   const makeNode = (time) => {
    //     const pos = result.getNextPosition();
    //     if (!pos) return;
    //     new CoffeeNode(pos, dummy[0]);
    //     if (time > 100) time -= 50;
    //     // setTimeout(() => makeNode(time), time);
    //   };
    //   let timeSlice = 1000;
    //   makeNode(timeSlice);
    // }, 100);

    if ($("body").hasClass("search-mode")) {
      $("#search-bar").toggleClass("interaction-view");
      $(".node-container.root").toggleClass("fall-down default");
      $(".node-core").toggleClass("interaction-view");
      setTimeout(() => {
        $(".dynamic-view").toggleClass("search-mode root-mode");
        $(".node-container.root").toggleClass("fall-down default");
        $(".node-core").toggleClass("interaction-view");
        $(".node-container.root > .effect-halo").toggleClass(
          "effect-halo-blink effect-halo-runnig"
        );
        setTimeout(() => {
          let result = new ResultMap();
          const makeNode = (time) => {
            const pos = result.getNextPosition();
            if (!pos) {
              $(".node-container.root > .effect-halo").toggleClass(
                "effect-halo-blink effect-halo-runnig"
              );
              return;
            }
            new CoffeeNode(pos, dummy[0]);
            if (time > 100) time -= 50;
            setTimeout(() => makeNode(time), time);
          };
          let timeSlice = 1000;
          makeNode(timeSlice);
        }, 750);
      }, 2000);
    } else {
      $(
        "#root-context > #result-container > #result-body > #node-layer > .node-container"
      ).remove();
      $(
        "#root-context > #result-container > #result-body > #modal-layer > .result-preview"
      ).remove();
      $(".dynamic-view").toggleClass("search-mode root-mode");
    }

    // this._model.ChangeViewModel([
    //   { view: "base-view", object: "text-input", data: { show: true } },
    // ]);
  };
  BaseView_MakeGiftCard = () => {
    // this._view.QuickChange("base-view", "goButton");
    // let text = this._view.GetViewData("base-view", "code");
    // let codes = this._parser.Run(text);
    // if (codes.length === 0) {
    //   return;
    // }
    // this._model.ChangeViewModel([
    //   { view: "base-view", object: "code-book", data: codes },
    // ]);
  };
  BaseView_CloseOverlay = () => {
    // this._model.ChangeViewModel([
    //   { view: "base-view", object: "text-input", data: { show: false } },
    // ]);
  };
}
