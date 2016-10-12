var XMLParser = require('react-xml-parser');

export default class Vast {
  constructor(url) {
    this.ePlanningVAST = url;
  }

  getVAST() {
    return fetch(this.ePlanningVAST, { method: 'post' })
    .then((response) => response.text())
    .then((xmlText) =>  {
        let resp = null;
      	let xml = new XMLParser().parseFromString(xmlText);
        if(xml.getElementsByTagName('Impression') && xml.getElementsByTagName('MediaFile')) {
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
  }

  impressionVAST(url) {
    return fetch(url)
    .then(() => {
        console.log('VAST Impression');
    });
  }
}
