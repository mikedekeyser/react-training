import { useEffect, useState, useRef, RefObject } from 'react'
import Highcharts, { Chart, numberFormat } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IPriceToday, ITradingData } from '../services/Interfaces'
import {getStockHistory} from '../repository/GetStockHistory'
import { GraphModesEnum } from '../services/Enums'

export const Graph = (props:{tradingData:ITradingData, mode:GraphModesEnum, currentStock:string} ) => {
    const highChartsRef = useRef<{ chart: Chart; container: RefObject<HTMLDivElement>; }>(null);

    // let currentStock = '';
    // if (!props.tradingData.currentStock) {
    //     currentStock='ACME';
    //     props.tradingData.setCurrentStock(currentStock);
    // } else 
    //     currentStock=props.tradingData.currentStock;

    const [stockHistory, setStockHistory] = useState<IPriceToday>();
    useEffect(()=>{
        getStockHistory(props.currentStock?props.currentStock:'ACME', setStockHistory);
    },[props.currentStock])

    let options:Highcharts.Options = {};
    switch (props.mode) {
        case GraphModesEnum.WATCH:
            options = {
                chart: { type: 'line' },
                title: {
                    text: props?.tradingData?.stocks?.find((s)=>s.symbol===props.currentStock)?.name 
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
                    data: stockHistory?.detailed?.map((s)=>{
                        const point = {
                            x: Number(new Date(s.date)),
                            y: s.price
                        };
                        return point;
                    })
                }, {
                    type: 'line',
                    name: 'aggregated',
                    data: stockHistory?.aggregated?.map((s)=>{
                        const point = {
                            x: Number(new Date(s.date)),
                            y: s.price
                        };
                        return point;
                    })
                }]
            }

            break;
        case GraphModesEnum.DETAILS:
            // data = stockHistory?.detailed.map(sh => {
            //     const datapoint = {
            //         'date': sh.date,
            //         'price': sh.price,
            //     };
            //     return datapoint;
            // });
        
            break;
        default:
            break;
    }

    // useEffect(()=>{
    //     if (highChartsRef && highChartsRef.current && stockHistory) {
    //         let series = highChartsRef.current?.chart.options.series as unknown as { data: Number[] }[];
    //         series[0].data = stockHistory.detailed.map((x)=>x.price);
    //     }
    // },[stockHistory])
        




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