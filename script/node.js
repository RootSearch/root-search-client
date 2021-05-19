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
  // static __lifetime__ = 3500;

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
    this._setPosition(this.position);

    //내부 객체 연결
    this._linkObjects();

    //색상값 작성
    this.color = CoffeeNode.__indexColorPicher__(index, 15);

    //오버레이 모달 위치
    this.modal
      .children(".context")
      .addClass(this.position.left < 50 ? "left" : "right");

    //데이터 작성
    this._setData(data);

    //뷰 작성
    this._updateValid(this.valid);

    //이벤트 연결 1:좌, 2:휠클릭. 3:우
    this.decoration.core.mousedown((e) => {
      if (e.which === 1) {
        if (eventHandler.leftClick) eventHandler.leftClick();
        this._leftClick();
      }
      if (e.which === 3) {
        if (this.valid) {
          if (eventHandler.remove) eventHandler.remove();
        } else {
          if (eventHandler.restore) eventHandler.restore();
        }
      }
    });

    //호버 이벤트 연결
    this.decoration.core.hover(
      () => {
        if (!this.valid) return;
        if (eventHandler.enter) eventHandler.enter();
        this._hoverEnter();
      },
      () => {
        if (!this.valid) return;
        if (eventHandler.leave) eventHandler.leave();
        this._hoverLeave();
      }
    );
  }

  update = (valid) => {
    this.valid = valid;
    this._updateValid(this.valid);
    return this.position;
  };

  remove = () => {
    this.root.remove();
    this.modal.remove();
  };

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
    this.valid = data.valid;
    this.id = data.id;
    this.keyword = data.keyword;

    this.context.title.text(
      data.title.length > 46 ? data.title.slice(0, 45) + "..." : data.title
    );

    if (data.snippet !== null) {
      this.context.snippet.text(
        data.snippet.length > 166
          ? data.snippet.slice(0, 165) + " ..."
          : data.snippet
      );
    } else this.context.snippet.text(data.title);

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

  _updateValid = (valid) => {
    if (valid) this._restore();
    else this._remove();
  };

  _remove = () => {
    this.decoration.halo
      .addClass("effect-halo-blink")
      .removeClass("effect-halo-runnig");
    this.modal.addClass("hide").removeClass("show");
    this._changeNodeColor(CoffeeNode.__invalidColor__);

    //FIXME: 이 부분은 지금 노드를 본인이 스스로 삭제하고있음. 낭비 발생.
    // this.lifetime = setTimeout(this.remove, CoffeeNode.__lifetime__);
  };

  _restore = () => {
    this.decoration.halo
      .addClass("effect-halo-runnig")
      .removeClass("effect-halo-blink");
    this._changeNodeColor(this.color);

    //FIXME: 삭제를 취소하는 부분
    // clearTimeout(this.lifetime);
  };
}
