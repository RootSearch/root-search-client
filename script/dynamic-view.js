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
    // this.searchBar.click(eventHandlers["search-bar"]);
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
        this._showTextBox(data);
        break;
      case "center-button":
        this._switchDynamicView(data);
        break;
      case "dynamic-view-group":
        this._switchDynamicView(data);
        break;
      default:
    }
  };

  _switchDynamicView = (data) => {};

  // quickChange = (element) => {
  //   switch (element) {
  //     case "goButton":
  //       this.goButton.addClass("press-button");
  //       setTimeout(() => {
  //         this.goButton.removeClass("press-button");
  //       }, 210);
  //       break;
  //     default:
  //   }
  // };

  // GetCodeData = () => {
  //   return this.textInput.val();
  // };

  // _makeCodeBook = (data) => {
  //   console.log(data);
  //   this.itemBox.empty();
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       const element = data[key];
  //       let cardForm = this._createGiftCard(key, element);
  //       this.itemBox.append(cardForm);
  //     }
  //   }
  // };

  // _showTextBox = (data) => {
  //   if (data.show) {
  //     this.centerImage.addClass("press-button");
  //     setTimeout(() => {
  //       this.centerImage.removeClass("press-button");
  //     }, 210);
  //     this.haloEffect
  //       .addClass("effect-halo-runnig")
  //       .removeClass("effect-halo-blink");
  //     this.overlay.addClass("fade-in").removeClass("fade-out");
  //     this.overlay.css({ opacity: "1", "pointer-events": "auto" });
  //   } else {
  //     this.closeButton.addClass("press-button");
  //     setTimeout(() => {
  //       this.closeButton.removeClass("press-button");
  //     }, 210);
  //     this.haloEffect
  //       .addClass("effect-halo-blink")
  //       .removeClass("effect-halo-runnig");
  //     this.overlay.addClass("fade-out").removeClass("fade-in");
  //     this.overlay.css({ opacity: "0", "pointer-events": "none" });
  //   }
  // };

  // _createGiftCard = (index, pin) => {
  //   let element = `<input type="checkbox" id="check_${index}" />
  //                  <label for="check_${index}">
  //                    <div class="item animation-dom">
  //                      <div class="pin">
  //                        <div class="pin-num">${pin[0]}-${pin[1]}-${pin[2]}</div>
  //                        <div class="pin-num">${pin[3]}</div>
  //                      </div>
  //                    </div>
  //                  </label>`;
  //   return element;
  // };
}
