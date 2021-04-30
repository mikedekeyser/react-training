import { useEffect, useState, useRef, RefObject } from 'react'
import Highcharts, { Chart, numberFormat } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IPriceToday, ITradingData } from '../services/Interfaces'
import { getStockHistory } from '../repository/GetStockHistory'
import { GraphModesEnum } from '../services/Enums'

export const Graph = (props: { tradingData: ITradingData, mode: GraphModesEnum, currentStock: string }) => {
    const highChartsRef = useRef<{ chart: Chart; container: RefObject<HTMLDivElement>; }>(null);

    const [stockHistory, setStockHistory] = useState<IPriceToday>();
    useEffect(() => {
        getStockHistory(props.currentStock ? props.currentStock : 'ACME', setStockHistory);
    }, [props.currentStock])

    let options: Highcharts.Options = {};
    switch (props.mode) {
        case GraphModesEnum.WATCH:
            options = {
                chart: { type: 'line' },
                title: {
                    text: props?.tradingData?.stocks?.find((s) => s.symbol === props.currentStock)?.name
                },
                xAxis: { type: 'datetime' },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                        },
                        enableMouseTracking: false
                    }
                },

                series: [{
                    type: 'line',
                    name: 'detailed',
                    data: stockHistory?.detailed?.map((s) => {
                        return {
                            x: Number(new Date(s.date)),
                            y: s.price
                        };
                    })
                }, {
                    type: 'line',
                    name: 'aggregated',
                    data: stockHistory?.aggregated?.map((s) => {
                        return {
                            x: Number(new Date(s.date)),
                            y: s.price
                        };
                    })
                }]
            }

            break;
        case GraphModesEnum.DETAILS:
            break;
        default:
            break;
    }

    return props.currentStock ?
        <div>
            <section className="stock-graph" >
                <div id="stockGraphContainer" className="stock-graph__container">
                    <HighchartsReact ref={highChartsRef}
                        highcharts={Highcharts}
                        options={options} />
                </div>
            </section>
        </div>
        : <div>'No stock selected.'</div>;

}