import nes from "@hapi/nes/lib/client";
import { ISymbolPrice } from "./Interfaces";

class StockUpdateService {
  private nesClient!: nes.Client;

  constructor() {
    this.initWebSocketClient();
  }

  private initWebSocketClient() {
    console.log("stock updates", "start");

    this.nesClient = new nes.Client(
      "wss://demomocktradingserver.azurewebsites.net"
    );
    const start = async () => {
      await this.nesClient.connect();
    };

    start();
  }

  subscribe(symbol: string, updateCallback: UpdateCallback) {
    this.nesClient.subscribe("/livestream/" + symbol, updateCallback);
  }

  unsubscribeStockPrice(symbol: string) {
    this.nesClient.unsubscribe("/livestream/" + symbol);
  }
}

export type UpdateCallback = (update: ISymbolPrice) => void;

const stockUpdateService = new StockUpdateService();

export default stockUpdateService;