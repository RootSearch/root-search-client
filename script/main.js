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
});
