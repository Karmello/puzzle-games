export const fbLoginConfig = {
  appId: process.env.REACT_APP_FB_APP_ID,
  cookie: true,
  xfbml: true,
  version: 'v2.11'
}

console.log(process.env);

export const loadFbScript = (cb) => {
    
  ((d, s, id) => {
    
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
    js.onload = cb;

  })(document, 'script', 'facebook-jssdk');
}