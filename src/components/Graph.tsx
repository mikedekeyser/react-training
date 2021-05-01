import { useEffect, useState, useRef, RefObject, ChangeEvent } from 'react'
import Highcharts, { Chart } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IPriceToday, IAppData } from '../services/Interfaces'
import { getStockHistoryDaily } from '../repository/GetStockHistoryDaily'
import { getStockHistoryYearly } from '../repository/GetStockHistoryYearly'
import { GraphModesEnum, GraphPeriodEnum } from '../services/Enums'

export const Graph = (props: { appData: IAppData, mode: GraphModesEnum, currentStock: string }) => {
    const highChartsRef = useRef<{ chart: Chart; container: RefObject<HTMLDivElement>; }>(null);
    const [stockHistory, setStockHistory] = useState<IPriceToday>();
    const [period, setPeriod] = useState(GraphPeriodEnum.DAILY);

    useEffect(() => {
        if (props.appData.graphPeriod == GraphPeriodEnum.DAILY) {
            getStockHistoryDaily(props.currentStock ? props.currentStock : 'ACME', setStockHistory);
        } else {
            getStockHistoryYearly(props.currentStock ? props.currentStock : 'ACME', setStockHistory);
        }
        setPeriod(props.appData.graphPeriod);
    }, [props.currentStock, period])

    let options: Highcharts.Options = {};
    options = {
        chart: { type: 'line' },
        title: {
            text: props?.appData?.stocks?.find((s) => s.symbol === props.currentStock)?.name
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

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        props.appData.setGraphPeriod(e.target.value);
        setPeriod(Number.parseInt(e.target.value));
    }

    let periodOptions = <div></div>
    if (period == GraphPeriodEnum.DAILY) {
        periodOptions =
            <div>
                <select onChange={(e) => onChangeHandler(e)} >
                    <option key={GraphPeriodEnum.DAILY} value={GraphPeriodEnum.DAILY} selected>Daily</option>
                    <option key={GraphPeriodEnum.YEARLY} value={GraphPeriodEnum.YEARLY} >Yearly</option>
                </select>
            </div>
    }
    else {
        periodOptions =
            <div>
                <select onChange={(e) => onChangeHandler(e)} >
                    <option key={GraphPeriodEnum.DAILY} value={GraphPeriodEnum.DAILY} >Daily</option>
                    <option key={GraphPeriodEnum.YEARLY} value={GraphPeriodEnum.YEARLY} selected>Yearly</option>
                </select>
            </div>
    }

    let periodSection = null;
    if (props.mode === GraphModesEnum.DETAILS) {
        periodSection =
            <div>
                {periodOptions}
            </div>
    }

    return props.currentStock ?
        <div>
            {periodSection}
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