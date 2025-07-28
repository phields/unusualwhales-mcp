#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import dotenv from "dotenv";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { z } from "zod";

dotenv.config();

const API_KEY = process.env.UNUSUAL_WHALES_API_KEY;
if (!API_KEY) {
  throw new Error("UNUSUAL_WHALES_API_KEY environment variable is required");
}

const BASE_URL = "https://api.unusualwhales.com";

interface ApiResponse {
  [key: string]: any;
}

class UnusualWhalesAPI {
  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse> {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
      );

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: cleanParams,
        timeout: 30000
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        throw new Error(`API Error (${status}): ${message}`);
      }
      throw error;
    }
  }

  // Alerts
  async getAlerts(params: any = {}) {
    return this.makeRequest('/api/alerts', params);
  }

  async getAlertsConfiguration() {
    return this.makeRequest('/api/alerts/configuration');
  }

  // Congress
  async getCongressTrader(params: any = {}) {
    return this.makeRequest('/api/congress/congress-trader', params);
  }

  async getCongressLateReports(params: any = {}) {
    return this.makeRequest('/api/congress/late-reports', params);
  }

  async getCongressRecentTrades(params: any = {}) {
    return this.makeRequest('/api/congress/recent-trades', params);
  }

  // Darkpool
  async getDarkpoolRecent(params: any = {}) {
    return this.makeRequest('/api/darkpool/recent', params);
  }

  async getDarkpoolTicker(ticker: string, params: any = {}) {
    return this.makeRequest(`/api/darkpool/${ticker}`, params);
  }

  // Earnings
  async getEarningsAfterhours(params: any = {}) {
    return this.makeRequest('/api/earnings/afterhours', params);
  }

  async getEarningsPremarket(params: any = {}) {
    return this.makeRequest('/api/earnings/premarket', params);
  }

  async getEarningsTicker(ticker: string) {
    return this.makeRequest(`/api/earnings/${ticker}`);
  }

  // ETFs
  async getETFExposure(ticker: string) {
    return this.makeRequest(`/api/etfs/${ticker}/exposure`);
  }

  async getETFHoldings(ticker: string) {
    return this.makeRequest(`/api/etfs/${ticker}/holdings`);
  }

  async getETFInOutflow(ticker: string) {
    return this.makeRequest(`/api/etfs/${ticker}/in-outflow`);
  }

  async getETFInfo(ticker: string) {
    return this.makeRequest(`/api/etfs/${ticker}/info`);
  }

  async getETFWeights(ticker: string) {
    return this.makeRequest(`/api/etfs/${ticker}/weights`);
  }

  // Group Flow
  async getGroupFlowGreekFlow(flowGroup: string) {
    return this.makeRequest(`/api/group-flow/${flowGroup}/greek-flow`);
  }

  async getGroupFlowGreekFlowExpiry(flowGroup: string, expiry: string) {
    return this.makeRequest(`/api/group-flow/${flowGroup}/greek-flow/${expiry}`);
  }

  // Insider
  async getInsiderTransactions(params: any = {}) {
    return this.makeRequest('/api/insider/transactions', params);
  }

  async getInsiderSectorFlow(sector: string) {
    return this.makeRequest(`/api/insider/${sector}/sector-flow`);
  }

  async getInsiderTicker(ticker: string) {
    return this.makeRequest(`/api/insider/${ticker}`);
  }

  async getInsiderTickerFlow(ticker: string) {
    return this.makeRequest(`/api/insider/${ticker}/ticker-flow`);
  }

  // Institutions
  async getInstitutionActivity(name: string) {
    return this.makeRequest(`/api/institution/${name}/activity`);
  }

  async getInstitutionHoldings(name: string) {
    return this.makeRequest(`/api/institution/${name}/holdings`);
  }

  async getInstitutionSectors(name: string) {
    return this.makeRequest(`/api/institution/${name}/sectors`);
  }

  async getInstitutionOwnership(ticker: string) {
    return this.makeRequest(`/api/institution/${ticker}/ownership`);
  }

  async getInstitutions(params: any = {}) {
    return this.makeRequest('/api/institutions', params);
  }

  async getInstitutionsLatestFilings(params: any = {}) {
    return this.makeRequest('/api/institutions/latest_filings', params);
  }

  // Market
  async getMarketCorrelations(params: any = {}) {
    return this.makeRequest('/api/market/correlations', params);
  }

  async getMarketEconomicCalendar(params: any = {}) {
    return this.makeRequest('/api/market/economic-calendar', params);
  }

  async getMarketFDACalendar(params: any = {}) {
    return this.makeRequest('/api/market/fda-calendar', params);
  }

  async getMarketInsiderBuySells(params: any = {}) {
    return this.makeRequest('/api/market/insider-buy-sells', params);
  }

  async getMarketTide(params: any = {}) {
    return this.makeRequest('/api/market/market-tide', params);
  }

  async getMarketOIChange(params: any = {}) {
    return this.makeRequest('/api/market/oi-change', params);
  }

  async getMarketSectorETFs(params: any = {}) {
    return this.makeRequest('/api/market/sector-etfs', params);
  }

  async getMarketSpike(params: any = {}) {
    return this.makeRequest('/api/market/spike', params);
  }

  async getMarketTotalOptionsVolume(params: any = {}) {
    return this.makeRequest('/api/market/total-options-volume', params);
  }

  async getMarketSectorTide(sector: string) {
    return this.makeRequest(`/api/market/${sector}/sector-tide`);
  }

  async getMarketETFTide(ticker: string) {
    return this.makeRequest(`/api/market/${ticker}/etf-tide`);
  }

  // Net Flow
  async getNetFlowExpiry(params: any = {}) {
    return this.makeRequest('/api/net-flow/expiry', params);
  }

  // News
  async getNewsHeadlines(params: any = {}) {
    return this.makeRequest('/api/news/headlines', params);
  }

  // Option Contract
  async getOptionContractFlow(id: string) {
    return this.makeRequest(`/api/option-contract/${id}/flow`);
  }

  async getOptionContractHistoric(id: string) {
    return this.makeRequest(`/api/option-contract/${id}/historic`);
  }

  async getOptionContractIntraday(id: string) {
    return this.makeRequest(`/api/option-contract/${id}/intraday`);
  }

  async getOptionContractVolumeProfile(id: string) {
    return this.makeRequest(`/api/option-contract/${id}/volume-profile`);
  }

  // Option Trades
  async getOptionTradesFlowAlerts(params: any = {}) {
    return this.makeRequest('/api/option-trades/flow-alerts', params);
  }

  async getOptionTradesFullTape(date: string) {
    return this.makeRequest(`/api/option-trades/full-tape/${date}`);
  }

  // Screeners
  async getScreenerAnalysts(params: any = {}) {
    return this.makeRequest('/api/screener/analysts', params);
  }

  async getScreenerOptionContracts(params: any = {}) {
    return this.makeRequest('/api/screener/option-contracts', params);
  }

  async getScreenerStocks(params: any = {}) {
    return this.makeRequest('/api/screener/stocks', params);
  }

  // Seasonality
  async getSeasonalityMarket(params: any = {}) {
    return this.makeRequest('/api/seasonality/market', params);
  }

  async getSeasonalityPerformers(month: string) {
    return this.makeRequest(`/api/seasonality/${month}/performers`);
  }

  async getSeasonalityTickerMonthly(ticker: string) {
    return this.makeRequest(`/api/seasonality/${ticker}/monthly`);
  }

  async getSeasonalityTickerYearMonth(ticker: string) {
    return this.makeRequest(`/api/seasonality/${ticker}/year-month`);
  }

  // Shorts
  async getShortsData(ticker: string) {
    return this.makeRequest(`/api/shorts/${ticker}/data`);
  }

  async getShortsFTDs(ticker: string) {
    return this.makeRequest(`/api/shorts/${ticker}/ftds`);
  }

  async getShortsInterestFloat(ticker: string) {
    return this.makeRequest(`/api/shorts/${ticker}/interest-float`);
  }

  async getShortsVolumeAndRatio(ticker: string) {
    return this.makeRequest(`/api/shorts/${ticker}/volume-and-ratio`);
  }

  async getShortsVolumesByExchange(ticker: string) {
    return this.makeRequest(`/api/shorts/${ticker}/volumes-by-exchange`);
  }

  // Stock
  async getStockSectorTickers(sector: string) {
    return this.makeRequest(`/api/stock/${sector}/tickers`);
  }

  async getStockATMChains(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/atm-chains`);
  }

  async getStockExpiryBreakdown(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/expiry-breakdown`);
  }

  async getStockFlowAlerts(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/flow-alerts`);
  }

  async getStockFlowPerExpiry(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/flow-per-expiry`);
  }

  async getStockFlowPerStrike(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/flow-per-strike`);
  }

  async getStockFlowPerStrikeIntraday(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/flow-per-strike-intraday`);
  }

  async getStockFlowRecent(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/flow-recent`);
  }

  async getStockGreekExposure(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/greek-exposure`);
  }

  async getStockGreekExposureExpiry(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/greek-exposure/expiry`);
  }

  async getStockGreekExposureStrike(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/greek-exposure/strike`);
  }

  async getStockGreekExposureStrikeExpiry(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/greek-exposure/strike-expiry`);
  }

  async getStockGreekFlow(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/greek-flow`);
  }

  async getStockGreekFlowExpiry(ticker: string, expiry: string) {
    return this.makeRequest(`/api/stock/${ticker}/greek-flow/${expiry}`);
  }

  async getStockGreeks(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/greeks`);
  }

  async getStockHistoricalRiskReversalSkew(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/historical-risk-reversal-skew`);
  }

  async getStockInfo(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/info`);
  }

  async getStockInsiderBuySells(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/insider-buy-sells`);
  }

  async getStockInterpolatedIV(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/interpolated-iv`);
  }

  async getStockIVRank(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/iv-rank`);
  }

  async getStockMaxPain(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/max-pain`);
  }

  async getStockNetPremTicks(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/net-prem-ticks`);
  }

  async getStockNOPE(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/nope`);
  }

  async getStockOHLC(ticker: string, candleSize: string) {
    return this.makeRequest(`/api/stock/${ticker}/ohlc/${candleSize}`);
  }

  async getStockOIChange(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/oi-change`);
  }

  async getStockOIPerExpiry(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/oi-per-expiry`);
  }

  async getStockOIPerStrike(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/oi-per-strike`);
  }

  async getStockOptionChains(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/option-chains`);
  }

  async getStockOptionContracts(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/option-contracts`);
  }

  async getStockOptionStockPriceLevels(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/option/stock-price-levels`);
  }

  async getStockOptionVolumeOIExpiry(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/option/volume-oi-expiry`);
  }

  async getStockOptionsVolume(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/options-volume`);
  }

  async getStockSpotExposures(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/spot-exposures`);
  }

  async getStockSpotExposuresExpiryStrike(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/spot-exposures/expiry-strike`);
  }

  async getStockSpotExposuresStrike(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/spot-exposures/strike`);
  }

  async getStockState(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/stock-state`);
  }

  async getStockVolumePriceLevels(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/stock-volume-price-levels`);
  }

  async getStockVolatilityRealized(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/volatility/realized`);
  }

  async getStockVolatilityStats(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/volatility/stats`);
  }

  async getStockVolatilityTermStructure(ticker: string) {
    return this.makeRequest(`/api/stock/${ticker}/volatility/term-structure`);
  }
}

class UnusualWhalesMCP {
  private server: McpServer;
  private api: UnusualWhalesAPI;

  constructor() {
    this.api = new UnusualWhalesAPI();
    this.server = new McpServer({
      name: "unusualwhales-mcp",
      version: "0.1.0",
    });
    
    this.setupTools();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupTools(): void {
    // Alerts
    this.server.tool(
      "get_alerts",
      "Get triggered alerts for the user",
      {
        limit: z.number().optional().describe("Number of results to return"),
        page: z.number().optional().describe("Page number"),
        intraday_only: z.boolean().optional().describe("Only intraday alerts"),
        config_ids: z.array(z.string()).optional().describe("Alert configuration IDs"),
        ticker_symbols: z.string().optional().describe("Ticker symbols"),
        noti_types: z.array(z.string()).optional().describe("Notification types")
      },
      async (params) => {
        const result = await this.api.getAlerts(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_alerts_configuration",
      "Get alert configurations for the user",
      {},
      async () => {
        const result = await this.api.getAlertsConfiguration();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // Congress
    this.server.tool(
      "get_congress_trader",
      "Get recent reports by congress member",
      {
        limit: z.number().optional().describe("Number of results to return"),
        date: z.string().optional().describe("Date filter (YYYY-MM-DD)"),
        ticker: z.string().optional().describe("Ticker symbol"),
        name: z.string().optional().describe("Congress member name")
      },
      async (params) => {
        const result = await this.api.getCongressTrader(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_congress_late_reports",
      "Get recent late reports by congress members",
      {
        limit: z.number().optional().describe("Number of results to return"),
        date: z.string().optional().describe("Date filter (YYYY-MM-DD)"),
        ticker: z.string().optional().describe("Ticker symbol")
      },
      async (params) => {
        const result = await this.api.getCongressLateReports(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_congress_recent_trades",
      "Get latest trades by congress members",
      {
        limit: z.number().optional().describe("Number of results to return"),
        date: z.string().optional().describe("Date filter (YYYY-MM-DD)"),
        ticker: z.string().optional().describe("Ticker symbol")
      },
      async (params) => {
        const result = await this.api.getCongressRecentTrades(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // Darkpool
    this.server.tool(
      "get_darkpool_recent",
      "Get latest darkpool trades",
      {
        limit: z.number().optional().describe("Number of results to return"),
        date: z.string().optional().describe("Date filter (YYYY-MM-DD)"),
        min_premium: z.number().optional().describe("Minimum premium"),
        max_premium: z.number().optional().describe("Maximum premium"),
        min_size: z.number().optional().describe("Minimum size"),
        max_size: z.number().optional().describe("Maximum size"),
        min_volume: z.number().optional().describe("Minimum volume"),
        max_volume: z.number().optional().describe("Maximum volume")
      },
      async (params) => {
        const result = await this.api.getDarkpoolRecent(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_darkpool_ticker",
      "Get darkpool trades for a specific ticker",
      {
        ticker: z.string().describe("Ticker symbol"),
        date: z.string().optional().describe("Date filter (YYYY-MM-DD)"),
        newer_than: z.string().optional().describe("Newer than timestamp"),
        older_than: z.string().optional().describe("Older than timestamp"),
        min_premium: z.number().optional().describe("Minimum premium"),
        max_premium: z.number().optional().describe("Maximum premium"),
        min_size: z.number().optional().describe("Minimum size"),
        max_size: z.number().optional().describe("Maximum size"),
        min_volume: z.number().optional().describe("Minimum volume"),
        max_volume: z.number().optional().describe("Maximum volume"),
        limit: z.number().optional().describe("Number of results to return")
      },
      async (params) => {
        const { ticker, ...otherParams } = params;
        const result = await this.api.getDarkpoolTicker(ticker, otherParams);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // Earnings
    this.server.tool(
      "get_earnings_afterhours",
      "Get afterhours earnings for a date",
      {
        date: z.string().optional().describe("Date filter (YYYY-MM-DD)"),
        limit: z.number().optional().describe("Number of results to return"),
        page: z.number().optional().describe("Page number")
      },
      async (params) => {
        const result = await this.api.getEarningsAfterhours(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_earnings_premarket",
      "Get premarket earnings for a date",
      {
        date: z.string().optional().describe("Date filter (YYYY-MM-DD)"),
        limit: z.number().optional().describe("Number of results to return"),
        page: z.number().optional().describe("Page number")
      },
      async (params) => {
        const result = await this.api.getEarningsPremarket(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_earnings_ticker",
      "Get historical earnings data for a ticker",
      {
        ticker: z.string().describe("Ticker symbol")
      },
      async (params) => {
        const result = await this.api.getEarningsTicker(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // ETFs
    this.server.tool(
      "get_etf_exposure",
      "Get ETF exposure data",
      {
        ticker: z.string().describe("ETF ticker symbol")
      },
      async (params) => {
        const result = await this.api.getETFExposure(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_etf_holdings",
      "Get ETF holdings information",
      {
        ticker: z.string().describe("ETF ticker symbol")
      },
      async (params) => {
        const result = await this.api.getETFHoldings(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_etf_in_outflow",
      "Get ETF inflow & outflow data",
      {
        ticker: z.string().describe("ETF ticker symbol")
      },
      async (params) => {
        const result = await this.api.getETFInOutflow(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_etf_info",
      "Get ETF information",
      {
        ticker: z.string().describe("ETF ticker symbol")
      },
      async (params) => {
        const result = await this.api.getETFInfo(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_etf_weights",
      "Get ETF sector & country weights",
      {
        ticker: z.string().describe("ETF ticker symbol")
      },
      async (params) => {
        const result = await this.api.getETFWeights(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // Market
    this.server.tool(
      "get_market_tide",
      "Get market tide data",
      {},
      async () => {
        const result = await this.api.getMarketTide();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_market_economic_calendar",
      "Get economic calendar events",
      {
        date: z.string().optional().describe("Date filter (YYYY-MM-DD)"),
        limit: z.number().optional().describe("Number of results to return")
      },
      async (params) => {
        const result = await this.api.getMarketEconomicCalendar(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_market_fda_calendar",
      "Get FDA calendar events",
      {
        date: z.string().optional().describe("Date filter (YYYY-MM-DD)"),
        limit: z.number().optional().describe("Number of results to return")
      },
      async (params) => {
        const result = await this.api.getMarketFDACalendar(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_market_spike",
      "Get SPIKE data (volatility indicator)",
      {},
      async () => {
        const result = await this.api.getMarketSpike();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_market_total_options_volume",
      "Get total options volume across the market",
      {},
      async () => {
        const result = await this.api.getMarketTotalOptionsVolume();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // News
    this.server.tool(
      "get_news_headlines",
      "Get news headlines",
      {},
      async () => {
        const result = await this.api.getNewsHeadlines();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // Option Trades
    this.server.tool(
      "get_option_trades_flow_alerts",
      "Get option flow alerts",
      {},
      async () => {
        const result = await this.api.getOptionTradesFlowAlerts();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // Screeners
    this.server.tool(
      "get_screener_analysts",
      "Get analyst rating screener",
      {},
      async () => {
        const result = await this.api.getScreenerAnalysts();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_screener_option_contracts",
      "Get hottest chains screener (option contracts)",
      {},
      async () => {
        const result = await this.api.getScreenerOptionContracts();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_screener_stocks",
      "Get stock screener",
      {},
      async () => {
        const result = await this.api.getScreenerStocks();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // Stock
    this.server.tool(
      "get_stock_info",
      "Get stock information for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        const result = await this.api.getStockInfo(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_stock_flow_alerts",
      "Get flow alerts for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        const result = await this.api.getStockFlowAlerts(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_stock_flow_recent",
      "Get recent flows for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        const result = await this.api.getStockFlowRecent(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_stock_option_chains",
      "Get option chains for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        const result = await this.api.getStockOptionChains(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_stock_greek_exposure",
      "Get Greek exposure for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        const result = await this.api.getStockGreekExposure(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_stock_max_pain",
      "Get max pain data for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        const result = await this.api.getStockMaxPain(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_stock_iv_rank",
      "Get IV rank for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        const result = await this.api.getStockIVRank(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    this.server.tool(
      "get_stock_volatility_stats",
      "Get volatility statistics for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        const result = await this.api.getStockVolatilityStats(params.ticker);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Unusual Whales MCP server running on stdio");
  }
}

const argv = yargs(hideBin(process.argv))
  .option('stdio', {
    type: 'boolean',
    default: true,
    description: 'Use stdio transport'
  })
  .help()
  .parse();

const mcpServer = new UnusualWhalesMCP();
mcpServer.run().catch(console.error);