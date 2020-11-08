class ResultView {
  constructor() {
    this.pivot = 0;
    this.nodeLayer = $(
      "#root-context > #result-container > #result-body > #node-layer"
    );
    this.modalLayer = $(
      "#root-context > #result-container > #result-body > #modal-layer"
    );
    this.nodes = [];
  }
  linkObject = (view, map) => {
    this._view = view;
    this._controller = view.controller;
    this._map = map;
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
      case "results":
        this._drawNode(data);
        break;
      case "result-layer":
        this._clear(data);
        break;
      default:
    }
  };

  _clear = (data) => {
    console.log(data);
    if (data.mode === "search") {
      this.nodeLayer.empty();
      this.modalLayer.empty();
      this.pivot = 0;
    }
    if (data.mode === "root") {
      this.nodeLayer.empty();
      this.modalLayer.empty();
      this.pivot = 0;
    }
  };

  _drawNode = ({ container }) => {
    console.log(container);
    container.slice(this.pivot).forEach((element) => {
      const [position, index] = this._map.getNextPosition();
      if (!position) return;
      const node = new CoffeeNode(position, element, index, {
        click: () => window.open(element.link, "_blank").focus(),
      });
      this.nodes.push(node);
    });
    this.pivot = container.length;
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
