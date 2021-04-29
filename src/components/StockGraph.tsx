import { useEffect, useState, useRef, RefObject } from 'react'
import Highcharts, { Chart, numberFormat } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IPriceToday, ITradingData } from '../services/Interfaces'
import {getStockHistory} from '../repository/GetStockHistory'

export const StockGraph = (props:{tradingData:ITradingData}) => {
    const [options, setOptions] = useState(
        {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'My chart'
            },
            series: [
                {
                    data: [0]
                }
            ]
        }
    );

    const highChartsRef = useRef<{ chart: Chart; container: RefObject<HTMLDivElement>; }>(null);
    let currentStock = props.tradingData?.currentStock;
    let currentStockLatestPrice = props.tradingData?.watchList?.find((y) => y.symbol === props.tradingData.currentStock)?.price;

    const [stockHistory, setStockHistory] = useState<IPriceToday>();
    useEffect(()=>{
        if (props.tradingData && props.tradingData.currentStock)
            getStockHistory(props.tradingData.currentStock, setStockHistory);
    },[props.tradingData?.currentStock])

    useEffect(()=>{
        if (highChartsRef && highChartsRef.current && stockHistory) {
            let series = highChartsRef.current?.chart.options.series as unknown as { data: Number[] }[];
            series[0].data = stockHistory.detailed.map((x)=>x.price);
        }
    },[stockHistory])

    useEffect(() => {
        if (highChartsRef && highChartsRef.current && props.tradingData) {
            let series = highChartsRef.current?.chart.options.series as unknown as { data: Number[] }[];
            // initSeries.map((i)=>{
            //     series[0].data.push(i);
            // });
            let latestPrice = props.tradingData.watchList?.find((y) => y.symbol === props.tradingData.currentStock)?.price;
            if (latestPrice) series[0].data.push(latestPrice);
            
            setOptions(
                {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: props.tradingData ? props.tradingData.currentStock : 'No stock selected.'
                    },
                    series: [
                        {
                            data: series[0].data as number[]                 
                        }
                    ]
                }
            );

        }
    }, [currentStock, currentStockLatestPrice,stockHistory]);

    return currentStock ?
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