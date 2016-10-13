var XMLParser = require('react-xml-parser');

export default class Vast {
  constructor(url) {
    this.ePlanningVAST = url;
  }

  getVAST() {
    if(this.ePlanningVAST) {
      return fetch(this.ePlanningVAST, { method: 'post' })
      .then((response) => response.text())
      .then((xmlText) =>  {
          let resp = { preRollVideoSource : null };
        	let xml = new XMLParser().parseFromString(xmlText);
          if(xml.getElementsByTagName('Impression') && xml.getElementsByTagName('Impression')[0] && xml.getElementsByTagName('MediaFile') && xml.getElementsByTagName('MediaFile')[0]) {
              let impression = xml.getElementsByTagName('Impression')[0].value;
              resp = { preRollVideoSource : xml.getElementsByTagName('MediaFile')[0].value };
              return fetch(impression)
              .then(() => {
                return resp;
              }); 
          } else {
              return resp;
          }
      })
    } else {
      return new Promise((resolve, reject) => { resolve({ preRollVideoSource : null }); });
    }    
  }

  impressionVAST(url) {
    return fetch(url)
    .then(() => {
        console.log('VAST Impression');
    });
  }
}
