class CodeParser {
  constructor() {}
  run(text) {
    let code;
    let codeGroup = [];
    while ((code = this.codeReg.exec(text)) !== null) {
      let pin = code[0].replace(/-/gi, "");
      codeGroup.push(this.pinFormat(pin));
    }
    return codeGroup;
  }
  pinFormat(pin) {
    return [pin.slice(0, 4), pin.slice(4, 8), pin.slice(8, 12), pin.slice(12)];
  }
}
