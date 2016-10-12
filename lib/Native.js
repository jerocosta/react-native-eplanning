export default class Native {
  constructor(url) {
    this.ePlanningURL = url;
  }

  getNativeImpression() {
    console.log('this.ePlanningURL',this.ePlanningURL);
    return fetch(this.ePlanningURL, {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => 
    {
        let resp = null;
        console.log('banner',responseJson);
        if(responseJson.ads[0] && responseJson.ads[0].ext && responseJson.ads[0].ext.img_url) {
            resp = { body : responseJson.ads[0].ext.img_url, click_url : responseJson.ads[0].ext.click_url };
        }
        return resp; 
    });

  }
}
