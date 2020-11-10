class CoffeeNode {
  static __container_id__ = "#result-body";
  static __container__ = undefined;
  static __node__ = `
                <div class="node-container">
                    <span class="effect-halo effect-halo-runnig"></span>
                    <span class="effect-halo effect-halo-runnig"></span>
                    <span class="node-core interaction-view">
                        <img class="core-image coffee-bean animation-dom" alt="" />
                    </span>
                </div>`;

  static __modal__ = ` 
            <div class="result-preview animation-dom hide">
                <div class="node">
                    <span class="node-core">
                        <img class="core-image coffee-bean" alt="" />
                    </span>
                </div>
                <div class="context">
                    <img class="thumbnail" src="./style/resources/images/coffee-bean.png" alt="" />
                    <div class="title"></div>
                    <div class="snippet"></div>
                </div>
            </div>`;
  static __size__ = 20;

  static __positionColorPicker__ = (top, left, max) => {
    let [y, x] = [top / 70, left / 100];
    let red = parseInt(max * x);
    let green = parseInt(max * y);
    let blue = parseInt(max * Math.sqrt(x * x + y * y));
    return `rgb(${red},${green},${blue})`;
  };

  static __indexColorPicher__ = (index, step) => {
    let [offset, i] = [index * 2, index % 3];
    let rgb = [offset, offset, offset];
    rgb[i] += step;
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  };

  static __invalidColor__ = "rgba(5, 5, 5, 0.25)";

  /**
   *
   * @param {top, left} position
   * @param {title, link, ...} data
   */
  constructor(position, data, index, eventHandler) {
    if (CoffeeNode.__container__ === undefined)
      CoffeeNode.__container__ = $(CoffeeNode.__container_id__);

    //위치 지정
    this.position = position;
    this._setPosition(position);

    //내부 객체 연결
    this._linkObjects();

    //색상값 연결
    this.color = CoffeeNode.__indexColorPicher__(index, 15);
    this._changeNodeColor(this.color);

    //오버레이 모달 위치
    this.modal
      .children(".context")
      .addClass(position.left < 50 ? "left" : "right");

    //데이터 작성
    this._setData(data);

    //이벤트 연결 1:좌, 2:휠클릭. 3:우
    this.decoration.core.mousedown((e) => {
      console.log(e.which);
      if (e.which === 1) {
        if (eventHandler.leftClick) eventHandler.leftClick();
        this._leftClick();
      }
      if (e.which === 3) {
        if (this.isValid) {
          if (eventHandler.remove) eventHandler.remove();
        } else {
          if (eventHandler.restore) eventHandler.restore();
        }
      }
      e.stopPropagation();
    });

    //호버 이벤트 연결
    this.decoration.core.hover(
      () => {
        if (!this.isValid) return;
        if (eventHandler.enter) eventHandler.enter();
        this._hoverEnter();
      },
      () => {
        if (!this.isValid) return;
        if (eventHandler.leave) eventHandler.leave();
        this._hoverLeave();
      }
    );
  }

  _setPosition = (position) => {
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
  };

  _linkObjects = () => {
    //노드 내부 객체 프리픽스
    this.decoration = {
      halo: this.root.children(".effect-halo"),
      core: this.root.children(".node-core"),
      modalCore: this.modal.children(".node").children(".node-core"),
      image: this.root.children(".node-core").children(".core-image"),
      modalCoreImage: this.modal
        .children(".node")
        .children(".node-core")
        .children(".core-image"),
    };
    //모달 내부 객체 프리픽스
    this.context = {
      title: this.modal.children(".context").children(".title"),
      snippet: this.modal.children(".context").children(".snippet"),
      thumbnail: this.modal.children(".context").children(".thumbnail"),
    };
  };

  _setData = (data) => {
    //내부 내용 연결
    this.isClicked = false;
    this.isValid = data.valid;
    this.keyword = data.keyword;

    this.context.title.text(
      data.title.length > 46 ? data.title.slice(0, 45) + "..." : data.title
    );
    this.context.snippet.text(
      data.snippet.length > 166
        ? data.snippet.slice(0, 165) + " ..."
        : data.snippet
    );
    if (data.thumbnail !== null)
      this.context.thumbnail.attr("src", data.thumbnail);
  };

  _changeNodeColor = (color) => {
    this.decoration.halo.css({
      "background-color": color,
    });

    this.decoration.core.css({
      "background-color": color,
    });

    this.decoration.modalCore.css({
      "background-color": color,
    });
  };

  _hoverEnter = () => {
    this.modal.addClass("show").removeClass("hide");
  };
  _hoverLeave = () => {
    this.modal.addClass("hide").removeClass("show");
  };

  _leftClick = () => {
    this.decoration.image.removeClass("coffee-bean").addClass("coffee-cup");
    this.decoration.modalCoreImage
      .removeClass("coffee-bean")
      .addClass("coffee-cup");
    this.isClicked = true;
  };

  _remove = () => {
    this.isValid = false;
    this.modal.addClass("hide").removeClass("show");
    this._changeNodeColor(CoffeeNode.__invalidColor__);
  };

  _restore = () => {
    this.isValid = true;
    this._changeNodeColor(this.color);
  };
}
