import { useEffect, useState, useRef, RefObject } from 'react'
import Highcharts, { Chart, numberFormat } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IPriceToday, ITradingData } from '../services/Interfaces'
import { getStockHistoryDaily } from '../repository/GetStockHistoryDaily'
import { getStockHistoryYearly } from '../repository/GetStockHistoryYearly'
import { GraphModesEnum } from '../services/Enums'

export const Graph = (props: { tradingData: ITradingData, mode: GraphModesEnum, currentStock: string }) => {
    const highChartsRef = useRef<{ chart: Chart; container: RefObject<HTMLDivElement>; }>(null);
    const [period, setPeriod] = useState('Daily');
    const [stockHistory, setStockHistory] = useState<IPriceToday>();
    useEffect(() => {
        if (period==='Daily')
            getStockHistoryDaily(props.currentStock ? props.currentStock : 'ACME', setStockHistory);
        else
            getStockHistoryYearly(props.currentStock ? props.currentStock : 'ACME', setStockHistory);

    }, [props.currentStock, period])

    let options: Highcharts.Options = {};
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

    let periodOption = null;
    if (props.mode === GraphModesEnum.DETAILS) {
        periodOption =
            <div>
                <select onChange={(e) => setPeriod(e.target.value) } >
                    <option key='Daily' value='Daily'>Daily</option>
                    <option key='Yearly' value='Yearly'>Yearly</option>
                </select>
            </div>
    }

    return props.currentStock ?
        <div>
            {periodOption}
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