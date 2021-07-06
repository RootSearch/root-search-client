class Controller {
  static __gc_interval_time__ = 30000;

  static preload = (path, images) => {
    for (const key in images) {
      if (images.hasOwnProperty(key)) {
        const element = images[key];
        let image = new Image();
        image.src = path + element;
      }
    }
  };

  constructor() {}

  linkObject(model, view, api, parser) {
    this._model = model;
    this._view = view;
    this._api = api;
    this._parser = parser;
  }

  addEventHandler() {
    this._view.addEventHandler({
      "dynamic-view": {
        "search-bar": this.onChangeHandler(),
        "root-button": this.onSearchHandler(),
      },
      "result-view": {
        "click-result": this.onClickResultHandler(),
        "remove-result": this.removeResultHandler(),
        "request-delete": this.requestDeleteHandler(),
        "restore-result": this.restoreResultHandler(),
        "stop-search": this.stopSearchHandler(),
      },
    });
    this._api.addEventHandler({
      pending: (e) => console.log(e),
      success: this.onReceiveHandler(),
      error: (e) => console.log(e),
      delete: this.onDeleteHandler(),
    });
  }

  _garbageCollection() {
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
  }

  //FIXME: remove call을 노드까지 전달하는게 좋지 않을까.
  _startGC(intervalId) {
    if (intervalId) return;
    return setInterval(
      this._garbageCollection,
      Controller.__gc_interval_time__
    );
  }

  _stopGC(intervalId) {
    if (intervalId) clearInterval(intervalId);
    return 0;
  }

  // INFO: 삭제 요청에 성공할 때마다 GC를 수행하도록 하자
  onDeleteHandler() {
    this._garbageCollection();
  }

  /**
   *  [
   *   {view : <view name>, object : <object name>, data : <new data>},
   *   ...
   *  ]
   */

  onChangeHandler() {
    return (e) => {
      this._model.changeModel([
        {
          view: "dynamic-view",
          object: "search-bar",
          data: { search: $(e.target).val().trim() },
        },
      ]);
    };
  }

  onSearchHandler() {
    return (e) => {
      const { search } = this._model.readModel("dynamic-view", "search-bar");
      if (search.length === 0) return;

      const { mode } = this._model.readModel(
        "dynamic-view",
        "dynamic-view-group"
      );

      if (mode === "search") {
        //검색 실행
        this._api.startSearch(search);

        //WARN: gc 에러가 존재함 사용 금지
        //gc 시작
        // this.intervalId = this._startGC(this.intervalId);

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

        //WARN: gc 에러가 존재함 사용 금지
        //gc 종료
        // this.intervalId = this._stopGC(this.intervalId);

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
  }
  onReceiveHandler() {
    return (data) => {
      const { mode } = this._model.readModel(
        "dynamic-view",
        "dynamic-view-group"
      );
      if (mode !== "root") return;
      const next = this._parser.run(data);
      const { container: prev } = this._model.readModel(
        "result-view",
        "results"
      );
      this._model.changeModel([
        {
          view: "result-view",
          object: "results",
          data: { container: prev.concat(next) },
        },
      ]);
    };
  }

  onClickResultHandler() {
    return (link) => {
      window.open(link, "_blank").focus();
    };
  }

  stopSearchHandler() {
    return () => {
      this._api.stopSearch();
      this._model.changeModel([
        {
          view: "dynamic-view",
          object: "center-button",
          data: { mode: "end" },
        },
      ]);
    };
  }

  removeResultHandler() {
    return (keyword) => {
      const { container: prev } = this._model.readModel(
        "result-view",
        "results"
      );
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
  }

  requestDeleteHandler() {
    return (blockKeyword) => {
      const { search: searchKeyword } = this._model.readModel(
        "dynamic-view",
        "search-bar"
      );
      this._api.removeKeyword(searchKeyword, blockKeyword);
    };
  }

  restoreResultHandler() {
    return (keyword) => {
      const { container: prev } = this._model.readModel(
        "result-view",
        "results"
      );
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
}
