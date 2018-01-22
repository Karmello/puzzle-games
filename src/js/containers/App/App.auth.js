const appIds = {
  development: '2091909884383863',
  production: '143196443031298'
}

export const fbLoginConfig = {
  appId: appIds[process.env.NODE_ENV],
  cookie: true,
  xfbml: true,
  version: 'v2.11'
}

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