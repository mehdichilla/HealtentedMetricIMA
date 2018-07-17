'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: ['plugins/healthtended_metric_vis/healthtended_metric_vis']
    }

  });
};

;
module.exports = exports['default'];
