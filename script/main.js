let apigateway;
$(document).ready(() => {
  console.log("ready");

  const model = new Model(viewModel);

  const view = new View();
  const controller = new Controller();
  const base = new BaseView();
  const dynamic = new DynamicView();
  const result = new ResultView();
  apigateway = new ApiGateway();
  const nodemap = new NodeMap();
  const parser = new ResultParser(prototype);

  result.linkObject(view, nodemap);
  dynamic.linkObject(view);
  model.linkObject(view);
  controller.linkObject(model, view, apigateway, parser);

  view.linkObject(controller, {
    "base-view": base,
    "dynamic-view": dynamic,
    "result-view": result,
  });

  controller.addEventHandler();
});

const prototype = {
  title: "Title",
  snippet: "Snippet",
  link: "Link",
  thumbnail: "Thumbnail",
};

const viewModel = {
  "base-view": {
    modified: false,
    object: {},
  },
  "dynamic-view": {
    modified: false,
    object: {
      "search-bar": {
        modified: false,
        data: {
          search: "",
        },
      },
      "center-button": {
        modified: false,
        data: {
          mode: "search",
        },
      },
      "dynamic-view-group": {
        modified: false,
        data: {
          mode: "search",
        },
      },
    },
  },
  "result-view": {
    modified: false,
    object: {
      results: {
        modified: false,
        data: {
          container: [],
        },
      },
      "result-layer": {
        modified: false,
        data: {
          mode: "search",
        },
      },
    },
  },
};
