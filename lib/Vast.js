var XMLParser = require('react-xml-parser');

export default class Vast {
  constructor(url) {
    this.ePlanningVAST = url;
  }

  getVASTonJSON() {
    return fetch(this.ePlanningVAST, { method: 'post' })
    .then((response) => response.text())
    .then((xmlText) =>  {
        let resp = null;
    	let xml = new XMLParser().parseFromString(xmlText);  
        
        if(xml.getElementsByTagName('Impression') && xml.getElementsByTagName('MediaFile')) {
            resp = { impression : xml.getElementsByTagName('Impression'), mediafile : xml.getElementsByTagName('MediaFile') };
        }

        return resp; 
    });

  }
}
