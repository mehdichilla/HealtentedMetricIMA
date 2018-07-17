import _ from 'lodash';
import AggResponseTabifyTabifyProvider from 'ui/agg_response/tabify/tabify';
import uiModules from 'ui/modules';

const module = uiModules.get('kibana/healthtented_metric_vis', ['kibana']);

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
                const outputvalue = output.value;



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
            else if (val <= visParams.yellowThreshold && val > visParams.redThreshold ) {
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
        console.log(visParams);

    }
    function getFontColor(val,visParams){
      console.log(val);

        if(val != null) {

            return visParams.fontColor;
        }
        else{
            console.log("You can't change the color if there is no value.");
        }
    }

    $scope.processTableGroups = function (tableGroups) {
        tableGroups.tables.forEach(function (table) {
            table.columns.forEach(function (column, i) {
                const fieldFormatter = table.aggConfig(column).fieldFormatter();
                let value = table.rows[0][i];
                let formattedValue = isInvalid(value) ? '?' : fieldFormatter(value);

                const metric = {
                    label: column.title,
                    value: value,
                    formattedValue: formattedValue,
                };
                metrics.push(metric);
                metrics[column.title] = metric;

            });
        });
        updateOutputs();
        let outputValue=   $scope.vis.params.outputs[0].value;
        let color = getColor(outputValue, $scope.vis.params);
        let fontColor = getFontColor(outputValue, $scope.vis.params);


        $scope.vis.params.outputs[0].color=  color;
        console.log("getColor");
        console.log($scope.vis.params.outputs[0].color);
        $scope.vis.params.outputs[0].fontColor= fontColor;
        console.log("getFontColor");
        console.log($scope.vis.params.outputs[0].fontColor);




    };

    $scope.$watchMulti(['esResponse', 'vis.params'], function () {
        if ($scope.esResponse) {

            const options = {
                asAggConfigResults: true
            };
            for (let key in metrics) {
                if (metrics.hasOwnProperty(key)) {
                    delete metrics[key];
                }
            }
            calcOutputs.length = 0;
            metrics.length = 0;
            $scope.processTableGroups(tabifyAggResponse($scope.vis, $scope.esResponse, options));
            $element.trigger('renderComplete');
        }
    });

    $scope.$watchCollection('vis.params.outputs', updateOutputs);

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
