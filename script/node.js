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
  static __size__ = 20;
  /**
   *
   * @param {top, left} position
   * @param {title, link, ...} data
   */
  constructor(position, data) {
    if (CoffeeNode.__container__ === undefined)
      CoffeeNode.__container__ = $(CoffeeNode.__container_id__);
    console.log(CoffeeNode.__container__);
    this.dom = $(CoffeeNode.__node__)
      .appendTo(CoffeeNode.__container__)
      .css({
        top: "calc(" + position.top + "% - " + CoffeeNode.__size__ + "px)",
        left: "calc(" + position.left + "% - " + CoffeeNode.__size__ + "px)",
      });
    console.log(position);
    console.log(this.dom);
    this.dom.click(() => console.log("룰룰랄라 시발라"));
  }
}
