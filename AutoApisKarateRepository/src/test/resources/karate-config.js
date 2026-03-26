function() {
  var config = {};

  var env = karate.env || 'qa'; // Obtiene el entorno actual, 'dev' por defecto
  if (env === 'qa') {
    config.baseUrl = 'https://bfa-pe-tkz-qa-01-priv.fif.tech';
  } else if (env === 'dev') {
    config.baseUrl = 'https://bfa-pe-tkz-dev-01-priv.fif.tech';
  } else {
    config.baseUrl = 'https://bfa-pe-tkz-prod-01-priv.fif.tech';
  }


  return config;
}
