import React, { Component } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
// HC_more(Highcharts);


class HighchartReact extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          options: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Info'
            },
            subtitle: {
                text: 'Source: ....uz'
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'All transactions'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Income',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                color: 'blue'
        
            }, {
                name: 'OutCome',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
                color: 'red'
        
            }]
          }
        };
      }
    render() {
        return (
            <HighchartsReact
                constructorType={"chart"}
                ref={this.chartComponent}
                highcharts={Highcharts}
                options={this.state.options}
            />
            );
    }
}

export default HighchartReact