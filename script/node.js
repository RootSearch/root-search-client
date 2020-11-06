class CoffeeNode {
  static __container_id__ = "#result-body";
  static __container__ = undefined;
  static __node__ = `
                <div class="node-container">
                    <span class="effect-halo effect-halo-runnig"></span>
                    <span class="effect-halo effect-halo-runnig"></span>
                    <span class="node-core interaction-view">
                        <img class="core-image animation-dom" src="./style/resources/images/coffee-bean.png" alt="" />
                    </span>
                </div>`;

  static __modal__ = ` 
            <div class="result-preview animation-dom hide">
                <div class="node">
                    <span class="node-core">
                        <img class="core-image " src="./style/resources/images/coffee-bean.png" alt="" />
                    </span>
                </div>
                <div class="context">
                    <img class="thumbnail" src="./style/resources/images/coffee-bean.png" alt="" />
                    <div class="title"></div>
                    <div class="snippet"></div>
                </div>
            </div>`;
  static __size__ = 20;
  /**
   *
   * @param {top, left} position
   * @param {title, link, ...} data
   */
  constructor(position, data) {
    if (CoffeeNode.__container__ === undefined)
      CoffeeNode.__container__ = $(CoffeeNode.__container_id__);
    this.root = $(CoffeeNode.__node__)
      .appendTo(CoffeeNode.__container__.children("#node-layer"))
      .css({
        top: "calc(" + position.top + "% - " + CoffeeNode.__size__ + "px)",
        left: "calc(" + position.left + "% - " + CoffeeNode.__size__ + "px)",
      });

    this.modal = $(CoffeeNode.__modal__)
      .appendTo(CoffeeNode.__container__.children("#modal-layer"))
      .css({
        top: "calc(" + position.top + "% - " + CoffeeNode.__size__ + "px)",
        left: "calc(" + position.left + "% - " + CoffeeNode.__size__ + "px)",
      });

    this.decoration = {
      halo: this.root.children(".effect-halo"),
      core: this.root.children(".node-core"),
      modalCore: this.modal.children(".node").children(".node-core"),
      image: this.root.children(".node-core").children(".core-image"),
    };

    this.context = {
      title: this.modal.children(".context").children(".title"),
      snippet: this.modal.children(".context").children(".snippet"),
      thumbnail: this.modal.children(".context").children(".thumbnail"),
    };

    this.modal
      .children(".context")
      .addClass(position.left < 50 ? "left" : "right");

    // this.modal.children(".context").children(".thumbnail")
    this.context.title.text(data.title);
    this.context.snippet.text(data.snippet);
    if (data.thumbnail !== "null")
      this.context.thumbnail.attr("src", data.thumbnail);

    this.decoration.halo.css({
      "background-color": this.colorPicker(position.top, position.left, 255),
    });

    this.decoration.core.css({
      "background-color": this.colorPicker(position.top, position.left, 235),
    });

    this.decoration.modalCore.css({
      "background-color": this.colorPicker(position.top, position.left, 235),
    });

    this.decoration.core.click(() => window.open(data.link, "_blank").focus());
    this.decoration.core.hover(
      () => this.modal.addClass("show").removeClass("hide"),
      () => this.modal.addClass("hide").removeClass("show")
    );
  }

  colorPicker = (top, left, max) => {
    let [y, x] = [top / 70, left / 100];
    let red = parseInt(max * x);
    let green = parseInt(max * y);
    let blue = parseInt(max * Math.sqrt(x * x + y * y));
    return `rgb(${red},${green},${blue})`;
  };
}