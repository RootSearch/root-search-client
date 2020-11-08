class ResultView {
  constructor() {
    this.overlay = $("#overlay");
    this.textInput = $("#overlay > #text-box > #text-input");
    this.closeButton = $("#overlay > #text-box > #close-icon ");
    this.goButton = $("#overlay > #text-box > #button");
    this.itemBox = $("#overlay > #item-box");
    this.centerButton = $("#root-context > .node-container.root > .node-core");
    this.centerImage = $(
      "#root-context > .node-container > .node-core > .core-image"
    );
    this.haloEffect = $("#root-context > .node-container > .effect-halo");
  }
  linkObject = (view) => {
    this._view = view;
    this._controller = view.controller;
  };

  addEventHandler = (eventHandlers) => {
    this.centerButton.click(eventHandlers["center-button"]);
    this.goButton.click(eventHandlers["go-button"]);
    this.closeButton.click(eventHandlers["close-button"]);
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
      case "text-input":
        this._showTextBox(data);
        break;
      case "code-book":
        this._makeCodeBook(data);
        break;
      default:
    }
  };

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
