class ApiGateway {
  static __server_path__ = "https://localhost:5001/search";
  linkObject = (controller) => {
    this._controller = controller;
  };
  constructor() {
    this.eventSource = undefined;
  }

  addEventHandler = (eventHandlers) => {
    this.onPendingHandler = eventHandlers["pending"];
    this.onSuccessHandler = eventHandlers["success"];
    this.onErrorHandler = eventHandlers["error"];
  };

  startSearch = (targer) => {
    this.eventSource = this._createEventSource(this.eventSource, targer);
    this._addEventHandler(this.eventSource, {
      open: this._open,
      pending: this._pending,
      success: this._success,
      error: this._error,
    });
  };

  stopSearch = () => {
    if (!this.eventSource || this.eventSource.readyState === 2) return;
    this.eventSource.close();
    this.eventSource = undefined;
  };

  _open = (e) => {
    console.log(e);
  };

  _pending = (e) => {
    if (this.onPendingHandler) this.onPendingHandler(e);
  };

  _success = (message, data) => {
    if (this.onSuccessHandler) this.onSuccessHandler(JSON.parse(data).Results);
  };

  _error = (e) => {
    if (this.onErrorHandler) this.onErrorHandler(e);
  };

  _createEventSource = (eventSource, target) => {
    if (eventSource && eventSource.readyState !== 2) eventSource.close();
    return new EventSource(`${ApiGateway.__server_path__}/${target}`, {
      withCredentials: false,
    });
  };

  _addEventHandler = (eventSource, eventHandlers) => {
    eventSource.onopen = eventHandlers.open;
    eventSource.onmessage = (e) => eventHandlers.success("default", e.data);
    eventSource.addEventListener(
      "result",
      (e) => eventHandlers.success("result", e.data),
      false
    );
    eventSource.onerror = (e) => {
      eventHandlers.error(e);
      if (eventSource && eventSource.readyState !== 2) eventSource.close();
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
