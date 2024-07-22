module.exports = function override(config, env) {
  // Exclude node_modules from source-map-loader
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      rule.oneOf = rule.oneOf.map(loader => {
        if (loader.loader && loader.loader.includes('source-map-loader')) {
          loader.exclude = /node_modules/;
        }
        return loader;
      });
    }
    return rule;
  });
  return config;
};
