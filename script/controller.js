class Controller {
  static __gc_interval_time__ = 30000;
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
      "result-view": {
        "click-result": this.onClickResultHandler,
        "remove-result": this.removeResultHandler,
        "restore-result": this.restoreResultHandler,
        "stop-search": this.stopSearchHandler,
      },
    });
    this._api.addEventHandler({
      pending: (e) => console.log(e),
      success: this.onReceiveHandler,
      error: (e) => console.log(e),
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
  //FIXME: remove call을 노드까지 전달하는게 좋지 않을까.
  _startGC = (intervalId) => {
    if (intervalId) return;
    return setInterval(this.garbageCollection, Controller.__gc_interval_time__);
  };

  _stopGC = (intervalId) => {
    if (intervalId) clearInterval(intervalId);
    return 0;
  };

  /**
   *  [
   *   {view : <view name>, object : <object name>, data : <new data>},
   *   ...
   *  ]
   */

  onChangeHandler = (e) => {
    this._model.changeModel([
      {
        view: "dynamic-view",
        object: "search-bar",
        data: { search: $(e.target).val().trim() },
      },
    ]);
  };

  onSearchHandler = () => {
    const { mode } = this._model.readModel(
      "dynamic-view",
      "dynamic-view-group"
    );
    const { search } = this._model.readModel("dynamic-view", "search-bar");
    if (search.length === 0) return;

    if (mode === "search") {
      //검색 실행
      this._api.startSearch(search);
      //gc 시작
      this.intervalId = this._startGC(this.intervalId);
      // 노드 낙하
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
        //화면 변경
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
          {
            view: "result-view",
            object: "draw-state",
            data: { state: "running" },
          },
        ]);
      }, 2000);
    }

    if (mode === "root") {
      //검색 종료
      this._api.stopSearch();
      //gc 종료
      this.intervalId = this._stopGC(this.intervalId);
      //화면 복귀
      this._model.changeModel([
        {
          view: "dynamic-view",
          object: "search-bar",
          data: { search: "" },
        },
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
        {
          view: "result-view",
          object: "draw-state",
          data: { state: "idle" },
        },
        {
          view: "result-view",
          object: "results",
          data: { container: [] },
        },
      ]);
    }
  };
  onReceiveHandler = (data) => {
    const { mode } = this._model.readModel(
      "dynamic-view",
      "dynamic-view-group"
    );
    if (mode !== "root") return;
    const { container: prev } = this._model.readModel("result-view", "results");
    const next = this._parser.run(data);
    this._model.changeModel([
      {
        view: "result-view",
        object: "results",
        data: { container: prev.concat(next) },
      },
    ]);
  };

  onClickResultHandler = (link) => () => {
    window.open(link, "_blank").focus();
  };

  stopSearchHandler = () => {
    this._api.stopSearch();
    this._model.changeModel([
      {
        view: "dynamic-view",
        object: "center-button",
        data: { mode: "end" },
      },
    ]);
  };

  garbageCollection = () => {
    const { container: prev } = this._model.readModel("result-view", "results");
    if (prev.length === 0) return;
    const next = prev.filter((element) => element.valid);
    if (prev.length === next.length) return;
    this._model.changeModel([
      {
        view: "result-view",
        object: "results",
        data: { container: next },
      },
    ]);
  };

  removeResultHandler = (keyword) => {
    const { container: prev } = this._model.readModel("result-view", "results");
    const next = prev.map((element) =>
      keyword === element.keyword ? { ...element, valid: false } : element
    );
    this._model.changeModel([
      {
        view: "result-view",
        object: "results",
        data: { container: next },
      },
    ]);
  };

  restoreResultHandler = (keyword) => {
    const { container: prev } = this._model.readModel("result-view", "results");
    const next = prev.map((element) =>
      keyword === element.keyword ? { ...element, valid: true } : element
    );
    this._model.changeModel([
      {
        view: "result-view",
        object: "results",
        data: { container: next },
      },
    ]);
  };
}
