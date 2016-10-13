var DeviceInfo = require('react-native-device-info');

export default class Native {
  constructor(url) {
    this.ePlanningURL = url;
  }

  getNativeImpression() {
    if(this.ePlanningURL) {
      return fetch(this.ePlanningURL, {
        method: 'get',
        dataType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': DeviceInfo.getUserAgent()
        }
      })
      .then((response) => response.json())
      .then((responseJson) => 
      {
          let resp = null;
          if(responseJson.ads[0] && responseJson.ads[0].ext && responseJson.ads[0].ext.img_url) {
              resp = { body : responseJson.ads[0].ext.img_url, click_url : responseJson.ads[0].ext.click_url };
          }
          return resp; 
      });      
    } else {
      return new Promise((resolve, reject) => { resolve(null); });
    }


  }
}
