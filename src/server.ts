import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

import {
  getAlerts,
  getAlertsConfiguration,
  getCongressTrader,
  getCongressLateReports,
  getCongressRecentTrades,
  getDarkpoolRecent,
  getDarkpoolTicker,
  getEarningsAfterhours,
  getEarningsPremarket,
  getEarningsTicker,
  getETFExposure,
  getETFHoldings,
  getETFInOutflow,
  getETFInfo,
  getETFWeights,
  getMarketTide,
  getMarketEconomicCalendar,
  getMarketFDACalendar,
  getMarketSpike,
  getMarketTotalOptionsVolume,
  getNewsHeadlines,
  getOptionTradesFlowAlerts,
  getScreenerAnalysts,
  getScreenerOptionContracts,
  getScreenerStocks,
  getStockInfo,
  getStockFlowAlerts,
  getStockFlowRecent,
  getStockOptionChains,
  getStockGreekExposure,
  getStockMaxPain,
  getStockIVRank,
  getStockVolatilityStats,
  initializeUnusualWhalesAPI
} from "./tools.js";

export interface EnvironmentConfig {
  UNUSUAL_WHALES_API_KEY?: string;
}

export class UnusualWhalesMcp {
  public server: McpServer;
  private transport: StdioServerTransport | SSEServerTransport | StreamableHTTPServerTransport | null = null;
  
  constructor(config?: EnvironmentConfig) {
    // 如果提供了配置，初始化 API 客户端
    if (config) {
      initializeUnusualWhalesAPI(config);
    }
    
    this.server = new McpServer({
      name: "unusualwhales-mcp",
      version: "0.1.3",
    });
    
    this.setupTools();
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
        try {
          const result = await getAlerts(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_alerts_configuration",
      "Get alert configurations for the user",
      {},
      async () => {
        try {
          const result = await getAlertsConfiguration();
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getCongressTrader(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getCongressLateReports(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getCongressRecentTrades(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getDarkpoolRecent(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getDarkpoolTicker(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getEarningsAfterhours(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getEarningsPremarket(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_earnings_ticker",
      "Get historical earnings data for a ticker",
      {
        ticker: z.string().describe("Ticker symbol")
      },
      async (params) => {
        try {
          const result = await getEarningsTicker(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getETFExposure(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_etf_holdings",
      "Get ETF holdings information",
      {
        ticker: z.string().describe("ETF ticker symbol")
      },
      async (params) => {
        try {
          const result = await getETFHoldings(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_etf_in_outflow",
      "Get ETF inflow & outflow data",
      {
        ticker: z.string().describe("ETF ticker symbol")
      },
      async (params) => {
        try {
          const result = await getETFInOutflow(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_etf_info",
      "Get ETF information",
      {
        ticker: z.string().describe("ETF ticker symbol")
      },
      async (params) => {
        try {
          const result = await getETFInfo(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_etf_weights",
      "Get ETF sector & country weights",
      {
        ticker: z.string().describe("ETF ticker symbol")
      },
      async (params) => {
        try {
          const result = await getETFWeights(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // Market
    this.server.tool(
      "get_market_tide",
      "Get market tide data",
      {},
      async () => {
        try {
          const result = await getMarketTide();
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getMarketEconomicCalendar(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getMarketFDACalendar(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_market_spike",
      "Get SPIKE data (volatility indicator)",
      {},
      async () => {
        try {
          const result = await getMarketSpike();
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_market_total_options_volume",
      "Get total options volume across the market",
      {},
      async () => {
        try {
          const result = await getMarketTotalOptionsVolume();
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // News
    this.server.tool(
      "get_news_headlines",
      "Get latest news headlines for financial markets with filtering options",
      {
        limit: z.number().min(1).max(100).optional().describe("How many items to return (default: 50, max: 100, min: 1)"),
        major_only: z.boolean().optional().describe("When set to true, only returns major/significant news (default: false)"),
        page: z.number().optional().describe("Page number (use with limit). Starts on page 0"),
        search_term: z.string().optional().describe("A search term to filter news headlines by content"),
        sources: z.string().optional().describe("A comma-separated list of news sources to filter by (e.g., 'Reuters,Bloomberg')")
      },
      async (params) => {
        try {
          const result = await getNewsHeadlines(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // Option Trades
    this.server.tool(
      "get_option_trades_flow_alerts",
      "Get option flow alerts showing significant option trades and unusual activity",
      {
        all_opening: z.boolean().optional().describe("Boolean flag whether all transactions are opening transactions based on OI, Size & Volume (default: true)"),
        is_ask_side: z.boolean().optional().describe("Boolean flag whether a transaction is ask side (default: true)"),
        is_bid_side: z.boolean().optional().describe("Boolean flag whether a transaction is bid side (default: true)"),
        is_call: z.boolean().optional().describe("Boolean flag whether a transaction is a call (default: true)"),
        is_floor: z.boolean().optional().describe("Boolean flag whether a transaction is from the floor (default: true)"),
        is_otm: z.boolean().optional().describe("Only include contracts which are currently out of the money"),
        is_put: z.boolean().optional().describe("Boolean flag whether a transaction is a put (default: true)"),
        is_sweep: z.boolean().optional().describe("Boolean flag whether a transaction is a intermarket sweep (default: true)"),
        issue_types: z.array(z.enum(["Common Stock", "ETF", "Index", "ADR"])).optional().describe("An array of 1 or more issue types"),
        limit: z.number().min(1).max(200).optional().describe("How many items to return (default: 100, max: 200, min: 1)"),
        max_diff: z.string().optional().describe("The maximum OTM diff of a contract"),
        max_dte: z.number().min(0).optional().describe("The maximum days to expiry (min: 0)"),
        max_open_interest: z.number().min(0).optional().describe("The maximum open interest on that alert's contract"),
        max_premium: z.number().min(0).optional().describe("The maximum premium on that alert (min: 0)"),
        max_size: z.number().min(0).optional().describe("The maximum size on that alert (min: 0)"),
        max_volume: z.number().min(0).optional().describe("The maximum volume on that alert's contract"),
        max_volume_oi_ratio: z.number().min(0).optional().describe("The maximum ratio of contract volume to contract open interest"),
        min_diff: z.string().optional().describe("The minimum OTM diff of a contract"),
        min_dte: z.number().min(0).optional().describe("The minimum days to expiry (min: 0)"),
        min_open_interest: z.number().min(0).optional().describe("The minimum open interest on that alert's contract"),
        min_premium: z.number().min(0).optional().describe("The minimum premium on that alert (min: 0)"),
        min_size: z.number().min(0).optional().describe("The minimum size on that alert (min: 0)"),
        min_volume: z.number().min(0).optional().describe("The minimum volume on that alert's contract"),
        min_volume_oi_ratio: z.number().min(0).optional().describe("The minimum ratio of contract volume to contract open interest"),
        newer_than: z.string().optional().describe("Unix time in milliseconds/seconds or ISO date (2024-01-25) - no older results will be returned"),
        older_than: z.string().optional().describe("Unix time in milliseconds/seconds or ISO date (2024-01-25) - no newer results will be returned"),
        rule_name: z.array(z.enum(["FloorTradeSmallCap", "FloorTradeMidCap", "RepeatedHits", "RepeatedHitsAscendingFill", "RepeatedHitsDescendingFill", "FloorTradeLargeCap", "OtmEarningsFloor", "LowHistoricVolumeFloor", "SweepsFollowedByFloor"])).optional().describe("An array of 1 or more rule names"),
        ticker_symbol: z.string().optional().describe("A comma separated list of tickers. To exclude certain tickers prefix the first ticker with a -")
      },
      async (params) => {
        try {
          const result = await getOptionTradesFlowAlerts(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // Screeners
    this.server.tool(
      "get_screener_analysts",
      "Get analyst rating screener",
      {},
      async () => {
        try {
          const result = await getScreenerAnalysts();
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_screener_option_contracts",
      "Get hottest chains screener (option contracts)",
      {},
      async () => {
        try {
          const result = await getScreenerOptionContracts();
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_screener_stocks",
      "Get stock screener",
      {},
      async () => {
        try {
          const result = await getScreenerStocks();
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
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
        try {
          const result = await getStockInfo(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_stock_flow_alerts",
      "Get flow alerts for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        try {
          const result = await getStockFlowAlerts(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_stock_flow_recent",
      "Get recent flows for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        try {
          const result = await getStockFlowRecent(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_stock_option_chains",
      "Get option chains for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        try {
          const result = await getStockOptionChains(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_stock_greek_exposure",
      "Get Greek exposure for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        try {
          const result = await getStockGreekExposure(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_stock_max_pain",
      "Get max pain data for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        try {
          const result = await getStockMaxPain(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_stock_iv_rank",
      "Get IV rank for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        try {
          const result = await getStockIVRank(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    this.server.tool(
      "get_stock_volatility_stats",
      "Get volatility statistics for a ticker",
      {
        ticker: z.string().describe("Stock ticker symbol")
      },
      async (params) => {
        try {
          const result = await getStockVolatilityStats(params);
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
            isError: true,
          };
        }
      }
    );
  }
  
  public async start(transportType: 'stdio' | 'sse' | 'streamableHttp' = 'stdio', options?: { endpoint?: string; response?: any; sessionIdGenerator?: () => string }): Promise<void> {
    try {
      if (transportType === 'stdio') {
        this.transport = new StdioServerTransport();
      } else if (transportType === 'sse') {
        if (!options?.response) {
          throw new Error("Response object is required for SSE transport");
        }
        this.transport = new SSEServerTransport(options.endpoint || "/message", options.response);
      } else if (transportType === 'streamableHttp') {
        this.transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: options?.sessionIdGenerator,
          // Add other options as needed
        });
      }
      
      if (this.transport) {
        await this.server.connect(this.transport);
        console.error(`Unusual Whales MCP server running on ${transportType}${options?.endpoint ? ` (endpoint ${options.endpoint})` : ''}`);
      }
    } catch (error) {
      console.error("Failed to start MCP server:", error);
      throw error;
    }
  }
  
  // 添加获取服务器实例的方法，用于 Hono 集成
  public getServer(): McpServer {
    return this.server;
  }
  
  // 添加创建 SSE 传输的方法
  public createSSETransport(endpoint: string = "/message", response: any): SSEServerTransport {
    return new SSEServerTransport(endpoint, response);
  }
  
  // 添加创建 StreamableHTTP 传输的方法
  public createStreamableHTTPTransport(options?: { sessionIdGenerator?: () => string }): StreamableHTTPServerTransport {
    return new StreamableHTTPServerTransport({
      sessionIdGenerator: options?.sessionIdGenerator,
    });
  }
  
  public async stop(): Promise<void> {
    if (this.transport) {
      try {
        this.transport = null;
        console.error("Unusual Whales MCP server stopped");
      } catch (error) {
        console.error("Failed to stop MCP server:", error);
        throw error;
      }
    }
  }
}

// Export a function to create MCP instance with config (for Cloudflare Workers)
export function createUnusualWhalesMcp(config?: EnvironmentConfig): UnusualWhalesMcp {
  return new UnusualWhalesMcp(config);
}

// Export the MCP instance (backward compatibility - may fail without API key)
export let unusualWhalesMcp: UnusualWhalesMcp | null = null;

// 检查是否可以自动初始化（仅在 Node.js 环境中）
function canAutoInitialize(): boolean {
  return typeof process !== 'undefined' && 
         typeof process.env !== 'undefined' && 
         !!process.env.UNUSUAL_WHALES_API_KEY;
}

// 为了向后兼容，尝试自动初始化（仅在合适的环境中）
if (canAutoInitialize()) {
  try {
    unusualWhalesMcp = new UnusualWhalesMcp();
  } catch (error) {
    // 在 Cloudflare Workers 或其他环境中，这可能会失败
    // 用户需要使用 createUnusualWhalesMcp 函数手动创建实例
    console.warn('Unable to auto-initialize UnusualWhalesMcp. Use createUnusualWhalesMcp() with your API key.');
  }
}

// If this file is run directly, start the server
if (typeof require !== 'undefined' && 
    typeof module !== 'undefined' && 
    require.main === module) {
  if (unusualWhalesMcp) {
    unusualWhalesMcp.start().catch((error: Error) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  } else {
    console.error("Unable to start server: API key not configured. Please set UNUSUAL_WHALES_API_KEY environment variable.");
    process.exit(1);
  }
}