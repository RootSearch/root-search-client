$(document).ready(() => {
  console.log("ready");

  let model = new Model();
  let view = new View();
  let controller = new Controller();
  let base = new BaseView();
  let parser = new CodeParser("CultureLand");

  model.linkObject(view);
  controller.linkObject(model, view, parser);
  view.linkObject(controller, { "base-view": base });

  controller.addEventHandler();
  // controller.Preload("./style/images/", [
  //   "cross.png",
  //   "efmom.png",
  //   "giftcard.png",
  //   "icon.png",
  //   "rhine.png",
  // ]);
  $(".node-container.root").click(() => {
    // setTimeout(() => {
    //   let result = new ResultMap();
    //   const makeNode = (time) => {
    //     const pos = result.getNextPosition();
    //     if (!pos) return;
    //     new CoffeeNode(pos, dummy[0]);
    //     if (time > 100) time -= 50;
    //     // setTimeout(() => makeNode(time), time);
    //   };
    //   let timeSlice = 1000;
    //   makeNode(timeSlice);
    // }, 100);

    if ($("body").hasClass("search-mode")) {
      $("#search-bar").removeClass("interaction-view");
      $(".node-container.root").toggleClass("fall-down default");
      $(".node-core").toggleClass("interaction-view");
      setTimeout(() => {
        $(".dynamic-view").toggleClass("search-mode root-mode");
        $(".node-container.root").toggleClass("fall-down default");
        $(".node-core").toggleClass("interaction-view");
        $(".node-container.root > .effect-halo").toggleClass(
          "effect-halo-blink effect-halo-runnig"
        );
        setTimeout(() => {
          let result = new NodeMap();
          const makeNode = (time) => {
            const [pos, index] = result.getNextPosition();
            if (!pos) {
              $(".node-container.root > .effect-halo").toggleClass(
                "effect-halo-blink effect-halo-runnig"
              );
              return;
            }
            new CoffeeNode(pos, dummy[0], index, {
              click: () => window.open(dummy[0].link, "_blank").focus(),
            });
            if (time > 100) time -= 50;
            setTimeout(() => makeNode(time), time);
          };
          let timeSlice = 1000;
          makeNode(timeSlice);
        }, 750);
      }, 2000);
    } else {
      $(
        "#root-context > #result-container > #result-body > #node-layer > .node-container"
      ).remove();
      $(
        "#root-context > #result-container > #result-body > #modal-layer > .result-preview"
      ).remove();
      $("#search-bar").addClass("interaction-view");
      $(".dynamic-view").toggleClass("search-mode root-mode");
    }
  });
});
