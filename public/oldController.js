

/*
import _ from 'lodash';
import AggResponseTabifyTabifyProvider from 'ui/agg_response/tabify/tabify';
import uiModules from 'ui/modules';

const module = uiModules.get('kibana/healthtended_metric_vis', ['kibana']);

module.controller('KbnHealthtendedMetricVisController', function ($scope, $element, Private) {
    const tabifyAggResponse = Private(AggResponseTabifyTabifyProvider);
    const metrics = $scope.metrics = [];
    const calcOutputs = $scope.calcOutputs = [];

        function isInvalid(val) {
            return _.isUndefined(val) || _.isNull(val) || _.isNaN(val);
        }

        function updateOutputs() {
            $scope.vis.params.outputs.forEach(function (output) {
                try {
                    const func = Function("metrics", "return " + output.formula);
                    output.value = func(metrics) || "?";
                } catch (e) {
                    output.value = '?';
                }
            });
        }


        function getColor(val, visParams) {
            if (!visParams.invertScale) {
                if (val <= visParams.redThreshold) {
                    return visParams.redColor;
                }
                else if (val <= visParams.yellowThreshold && val > visParams.redThreshold) {
                    return visParams.yellowColor;
                }
                else {
                    return visParams.greenColor;
                }
            }
            else {
                if (val >= visParams.redThreshold) {
                    return visParams.redColor;
                }
                else if (val >= visParams.yellowThreshold && val < visParams.redThreshold) {
                    return visParams.yellowColor;
                }
                else {
                    return visParams.greenColor;
                }
            }
        }

        function getFontColor(val, visParams) {
            if (val != null) {
                return visParams.fontColor;
            }
            else {
                console.log("No value !!!");
            }
        }

         $scope.processTableGroups = function (tableGroups) {
             tableGroups.tables.forEach(function (table) {
                 table.columns.forEach(function (column, i) {
                     const fieldFormatter = table.aggConfig(column).fieldFormatter();
                     let value = table.rows[0][i].value;
                     let formattedValue = isInvalid(value) ? '?' : fieldFormatter(value);
                     let color = getColor(value, $scope.vis.params);
                     let fontColor = getFontColor(value, $scope.vis.params);

                     const metric = {
                         label: column.title,
                         value: value,
                         formattedValue: formattedValue
                     };
                     metrics.push({
                         label: column.title,
                         value: value,
                         formattedValue: formattedValue,
                         color: color,
                         fontColor: fontColor
                     });
                     metrics[column.title] = metric;
                 });
             });

             updateOutputs();
         };

    // watches
    $scope.$watch('esResponse', function (resp) {
        if (resp) {
            const options = {
                asAggConfigResults: true
            };
            calcOutputs.length = 0;
            metrics.length = 0;
            for (let key in metrics) {
                if (metrics.hasOwnProperty(key)) {
                    delete metrics[key];
                }
            }
            $scope.processTableGroups(tabifyAggResponse($scope.vis, $scope.esResponse, options));

}
});

 $scope.$watchCollection('vis.params.outputs', updateOutputs);
});


module.controller('HealthtendedMetricEditorController', function ($scope) {
    // Output Related Methods:
    $scope.addOutput = function (outputs) {
        outputs.push({
            formula: 'metrics[0].value * metrics[0].value',
            label: 'Count squared',
            enabled: true
        });
    };

    $scope.removeOuput = function (output, outputs) {
        if (outputs.length === 1) {
            return;
        }
        const index = outputs.indexOf(output);
        if (index >= 0) {
            outputs.splice(index, 1);
        }

        if (outputs.length === 1) {
            outputs[0].enabled = true;
        }
    };
});
*/
