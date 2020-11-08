class DynamicView {
  constructor() {
    this.dynamicViews = $(".dynamic-view");
    this.searchBar = $("#search-context > #search-container > #search-bar");
    this.centerButton = {
      container: $("#root-context > .node-container.root"),
      core: $("#root-context > .node-container.root > .node-core"),
      helo: $("#root-context >.node-container.root > .effect-halo"),
    };
  }
  linkObject = (view) => {
    this._view = view;
    this._controller = view.controller;
  };

  addEventHandler = (eventHandlers) => {
    this.searchBar.change(eventHandlers["search-bar"]);
    this.centerButton.container.click(eventHandlers["root-button"]);
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
      case "search-bar":
        this._onChangeSearchBar(data);
        break;
      case "center-button":
        this._switchCenterButton(data);
        break;
      case "dynamic-view-group":
        this._switchDynamicView(data);
        break;
      default:
    }
  };
  _onChangeSearchBar = (data) => {
    console.log(data);
  };

  _switchCenterButton = (data) => {
    if (data.mode === "search") {
      this.centerButton.helo
        .addClass("effect-halo-blink")
        .removeClass("effect-halo-runnig");
    }
    if (data.mode === "falling") {
      this.centerButton.container.addClass("fall-down").removeClass("default");
      $(".node-core").removeClass("interaction-view");
    }
    if (data.mode === "root") {
      this.centerButton.helo
        .addClass("effect-halo-runnig")
        .removeClass("effect-halo-blink");
      this.centerButton.container.addClass("default").removeClass("fall-down");
      $(".node-core").addClass("interaction-view");
    }
    if (data.mode === "end") {
      this.centerButton.helo
        .addClass("effect-halo-blink")
        .removeClass("effect-halo-runnig");
    }
  };

  _switchDynamicView = (data) => {
    if (data.mode === "search") {
      this.searchBar.addClass("interaction-view");
      this.dynamicViews.addClass("search-mode").removeClass("root-mode");
    }
    if (data.mode === "falling") {
      this.searchBar.removeClass("interaction-view");
    }
    if (data.mode === "root") {
      this.dynamicViews.addClass("root-mode").removeClass("search-mode");
    }
  };
}
