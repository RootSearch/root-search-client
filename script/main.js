// let model;
// let view;
// let controller;
// let base;
// let parser;

$(document).ready(() => {
  console.log("ready");

  let model = new Model();
  let view = new View();
  let controller = new Controller();
  let base = new BaseView();
  let parser = new CodeParser("CultureLand");

  model.ObjectLinker(view);
  controller.ObjectLinker(model, view, parser);
  view.ObjectLinker(controller, { "base-view": base });

  controller.AddEventHandler();
  // controller.Preload("./style/images/", [
  //   "cross.png",
  //   "efmom.png",
  //   "giftcard.png",
  //   "icon.png",
  //   "rhine.png",
  // ]);

  $("#result-body").click((e) => {
    const pos = e.originalEvent;
    console.log(
      "top : " +
        ((100 * pos.layerY) / $("#result-body").height()).toFixed(2) +
        " %",
      ", ",
      "left : " +
        ((100 * pos.layerX) / $("#result-body").width()).toFixed(2) +
        " %"
    ); //
    const temp = {
      top: ((100 * pos.layerY) / $("#result-body").height()).toFixed(2),
      left: ((100 * pos.layerX) / $("#result-body").width()).toFixed(2),
    };
    const data = {
      top: ((100 * pos.layerY) / $("#result-body").height()).toFixed(2),
      left: ((100 * pos.layerX) / $("#result-body").width()).toFixed(2),
    };
    let a = new CoffeeNode(temp, data);
    // $(`
    //     <div class="node-container default">
    //       <span class="effect-halo effect-halo-runnig"></span>
    //       <span class="effect-halo effect-halo-runnig"></span>
    //       <span class="node-core interaction-view">
    //         <img class="core-image animation-dom" src="./style/resources/images/coffee-bean.png" alt="" />
    //       </span>
    //     </div>
    // `)
    //   .appendTo($("#result-body"))
    //   .css({
    //     top:
    //       ((100 * (pos.layerY - 20)) / $("#result-body").height()).toFixed(2) +
    //       "%",
    //     left:
    //       ((100 * (pos.layerX - 20)) / $("#result-body").width()).toFixed(2) +
    //       "%",
    //   });
  });
});

/**
top : 30.89,  left : 14.26
top : 32.92,  left : 6.45
top : 35.28,  left : 0.98
top : 39.09,  left : 5.66
top : 41.23,  left : 16.99
top : 40.89,  left : 9.77
top : 46.40,  left : 9.47
top : 45.61,  left : 15.53
top : 51.00,  left : 8.98
top : 50.22,  left : 13.57
top : 58.64,  left : 8.20
top : 60.44,  left : 11.04
top : 58.87,  left : 16.31
top : 66.17,  left : 8.69
top : 66.06,  left : 13.28
top : 56.73,  left : 24.41
top : 63.02,  left : 20.80
top : 67.97,  left : 15.92
top : 72.57,  left : 14.45
top : 76.95,  left : 13.77
top : 72.12,  left : 21.00
top : 64.26,  left : 27.34
top : 83.02,  left : 14.06
top : 88.08,  left : 16.41
top : 80.77,  left : 21.29
top : 86.17,  left : 21.68
top : 89.65,  left : 23.93
top : 80.21,  left : 25.68
top : 92.68,  left : 25.78
top : 96.61,  left : 29.00
top : 91.67,  left : 33.11
top : 84.14,  left : 33.89
top : 78.41,  left : 34.77
top : 66.96,  left : 31.45
top : 54.49,  left : 37.11
top : 61.68,  left : 35.16
top : 69.76,  left : 35.55
top : 73.02,  left : 37.60
top : 52.80,  left : 39.94
top : 49.99,  left : 42.48
top : 95.04,  left : 33.79
top : 93.58,  left : 39.26
top : 96.16,  left : 41.70
top : 91.45,  left : 42.87
top : 83.47,  left : 39.65
top : 62.91,  left : 42.58
top : 68.42,  left : 43.36
top : 64.15,  left : 45.21
top : 68.98,  left : 48.63
top : 76.28,  left : 49.61
top : 81.00,  left : 46.39
top : 86.17,  left : 45.41
top : 86.05,  left : 48.14
top : 88.41,  left : 49.90
top : 80.32,  left : 52.34
top : 51.23,  left : 49.61
top : 57.29,  left : 53.13
top : 63.14,  left : 53.03
top : 66.17,  left : 51.17
top : 68.64,  left : 53.42
top : 75.61,  left : 53.81
top : 89.31,  left : 52.73
top : 97.18,  left : 54.88
top : 96.39,  left : 57.91
top : 73.58,  left : 57.52
top : 80.44,  left : 59.18
top : 91.33,  left : 58.69
top : 87.74,  left : 60.84
top : 96.28,  left : 61.23
top : 89.65,  left : 64.36
top : 86.28,  left : 63.38
top : 96.05,  left : 66.80
top : 85.83,  left : 70.90
top : 90.44,  left : 71.00
top : 86.95,  left : 76.95
top : 89.09,  left : 79.88
top : 83.92,  left : 66.02
top : 81.56,  left : 68.36
top : 77.52,  left : 70.70
top : 79.99,  left : 72.85
top : 73.81,  left : 61.82
top : 67.07,  left : 63.28
top : 53.14,  left : 56.64
top : 56.51,  left : 58.30
top : 43.48,  left : 57.03
top : 51.56,  left : 63.87
top : 58.19,  left : 61.82
top : 59.43,  left : 65.92
top : 69.76,  left : 65.23
top : 69.76,  left : 69.82
top : 73.47,  left : 69.43
top : 61.56,  left : 70.41
top : 68.53,  left : 72.66
top : 85.16,  left : 84.08
top : 78.19,  left : 80.08
top : 81.78,  left : 88.48
top : 78.75,  left : 89.65
top : 73.70,  left : 89.65
top : 72.91,  left : 83.59
top : 67.74,  left : 88.67
top : 68.08,  left : 79.88
top : 69.76,  left : 83.11
top : 64.26,  left : 85.94
top : 64.03,  left : 89.65
top : 62.24,  left : 77.15
top : 55.27,  left : 73.54
top : 58.53,  left : 81.84
top : 59.32,  left : 90.14
top : 48.42,  left : 69.82
top : 53.59,  left : 87.79
top : 49.99,  left : 85.94
top : 48.42,  left : 90.53
top : 45.50,  left : 87.79
top : 43.59,  left : 76.37
top : 38.98,  left : 67.38
top : 32.92,  left : 70.70
top : 31.91,  left : 89.84
top : 32.92,  left : 93.95
top : 38.42,  left : 92.58
top : 39.09,  left : 97.66
top : 44.15,  left : 96.00
*/
