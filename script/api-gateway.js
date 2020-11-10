class ApiGateway {
  static __server_path__ = "https://localhost:5001/search";
  linkObject = (controller) => {
    this._controller = controller;
  };
  constructor() {}

  addEventHandler = (eventHandlers) => {
    this.onPendingHandler = eventHandlers["pending"];
    this.onSuccessHandler = eventHandlers["success"];
    this.onErrorHandler = eventHandlers["error"];
  };

  success = (dummy) => {
    this.onSuccessHandler(dummy);
  };

  openSSE = (target) => {
    this.es = new EventSource(`${ApiGateway.__server_path__}/${target}`, {
      withCredentials: false,
    });
    this.es.onopen = (e) => {
      console.log("open sse", e);
    };
    this.es.onmessage = (e) => {
      console.log("default", JSON.parse(e.data));
    };
    this.es.addEventListener(
      "result",
      (e) => {
        console.log("result", JSON.parse(e.data));
      },
      false
    );
    this.es.onerror = (e) => {
      console.log("error sse", e);
      this.es.close();
    };
  };
}

const dummy = [
  {
    title: "COVID-19 Open Research Dataset Challenge  |  Kaggle",
    snippet:
      "5 days ago ... Dataset Description. In response to the COVID-19 pandemic, the White House \nand a coalition of leading research groups have prepared the ...",
    link:
      "https://www.google.com/appserve/mkt/p/AMJ1musddqVXQmUfEAzAllovWEJnShJN1vFCS9_25OzCtY6Mx_KtBtJIkB2HtgylUDwJ8lWeApmLkW00Ojh3lNFG-o3qqFybyNt5j1QQ7lCHg4UIYSTmNgb2wg4a7T9FIvc5dLUdjt7hf7-vxnQYQ37A7QelIFmZMiqHvHdTUpU8bKgUha8DMoamtknYhhZsKczUlz4Re9qVlKyL_itNP73TEyLWicIprxZWSRFdMDYbnqJIUk82zOmRJTsF0A",
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTq2rwd9lMrkemljWGdXZW_fkQ8OOsrdAWNCWG9HS7DY9Ri97y7gmTTxX0V",
  },
];
