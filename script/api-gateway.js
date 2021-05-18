class ApiGateway {
  static __server_path__ = "https://rootsearch.vumigration.com:5001";
  static __search__ = "/search";

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
    this.onDeleteHandler = eventHandlers["delete"];
  };

  startSearch = (target) => {
    this.eventSource = this._createEventSource(this.eventSource, target);
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

  removeKeyword = (target) => {
    const httpsRequest = new XMLHttpRequest();
    if (!httpsRequest) {
      console.log("Fail to Create XMLHTTP Instance!");
      return;
    }
    httpsRequest.onreadystatechange = () => {
      if (httpsRequest.readyState === XMLHttpRequest.DONE) {
        if (httpsRequest.status === 200) this._delete();
        else this._error(httpsRequest.responseText);
      }
    };
    httpsRequest.open(
      "DELETE",
      `${ApiGateway.__server_path__}${ApiGateway.__search__}/${target}`
    );
    httpsRequest.send();
  };

  _open = (e) => {
    console.log(e);
  };

  _pending = (e) => {
    if (this.onPendingHandler) this.onPendingHandler(e);
  };

  _success = (message, data) => {
    if (this.onSuccessHandler) this.onSuccessHandler(JSON.parse(data));
  };

  _error = (e) => {
    if (this.onErrorHandler) this.onErrorHandler(e);
  };

  _delete = (e) => {
    if (this.onDeleteHandler) this.onDeleteHandler(e);
  };

  _createEventSource = (eventSource, target) => {
    if (eventSource && eventSource.readyState !== 2) eventSource.close();
    return new EventSource(
      `${ApiGateway.__server_path__}${ApiGateway.__search__}/${target}`,
      {
        withCredentials: false,
      }
    );
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
