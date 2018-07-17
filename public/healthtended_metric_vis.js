import 'plugins/healthtended_metric_vis/healthtended_metric_vis.less';
import 'plugins/healthtended_metric_vis/healthtended_metric_vis_controller';
import VisVisTypeProvider from 'ui/vis/vis_type';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import healthtendedMetricVisTemplate from 'plugins/healthtended_metric_vis/healthtended_metric_vis.html';
import metricVisParamsTemplate from 'plugins/healthtended_metric_vis/healthtended_metric_vis_params.html';
import visTypesRegistry from 'ui/registry/vis_types';

// we need to load the css ourselves

// we also need to load the controller and used by the template

// register the provider with the visTypes registry
visTypesRegistry.register(HealthtendedMetricVisProvider);
// require('ui/registry/vis_types').register(HealthtendedMetricVisProvider);

function HealthtendedMetricVisProvider(Private) {
    const VisType = Private(VisVisTypeProvider)
    const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
    const Schemas = Private(VisSchemasProvider);

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
        name: 'healthtended_metric',
        title: 'healthtended Metric',
        description: 'Based on the core Metric-Plugin but gives you the ability' +
        'to output custom aggregates on metric-results.',
        icon: 'fa-calculator',
        template: healthtendedMetricVisTemplate,
        params: {
            defaults: {
                handleNoResults: true,
                fontSize: 30,
                fontColor: "#000000",
                invertScale: false,
                redThreshold: 200,
                yellowThreshold: 100,
                redColor: "#fd482f",
                yellowColor: "#ffa500",
                greenColor: "#6dc066",
                outputs: [
                    {
                        formula: 'metrics[0].value * metrics[0].value',
                        label: 'Count squared',
                        color:"#6dc066",
                        fontColor:"#000000",
                        enabled: true
                    }
                ]
            },
            editor: metricVisParamsTemplate
        },
        implementsRenderComplete: true,
        schemas: new Schemas([
            {
                group: 'metrics',
                name: 'metric',
                title: 'Metric',
                min: 1,
                aggFilter: ['!derivative', '!geo_centroid'],
                defaults: [
                    {type: 'count', schema: 'metric'}
                ]
            }
        ])
    });
}

// export the provider so that the visType can be required with Private()
export default HealthtendedMetricVisProvider;
