#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import dotenv from "dotenv";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
dotenv.config();
const API_KEY = process.env.UNUSUAL_WHALES_API_KEY;
if (!API_KEY) {
    throw new Error("UNUSUAL_WHALES_API_KEY environment variable is required");
}
const BASE_URL = "https://api.unusualwhales.com";
class UnusualWhalesAPI {
    async makeRequest(endpoint, params = {}) {
        try {
            const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== undefined && value !== null));
            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                params: cleanParams,
                timeout: 30000
            });
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const message = error.response?.data?.message || error.message;
                throw new Error(`API Error (${status}): ${message}`);
            }
            throw error;
        }
    }
    // Alerts
    async getAlerts(params = {}) {
        return this.makeRequest('/api/alerts', params);
    }
    async getAlertsConfiguration() {
        return this.makeRequest('/api/alerts/configuration');
    }
    // Congress
    async getCongressTrader(params = {}) {
        return this.makeRequest('/api/congress/congress-trader', params);
    }
    async getCongressLateReports(params = {}) {
        return this.makeRequest('/api/congress/late-reports', params);
    }
    async getCongressRecentTrades(params = {}) {
        return this.makeRequest('/api/congress/recent-trades', params);
    }
    // Darkpool
    async getDarkpoolRecent(params = {}) {
        return this.makeRequest('/api/darkpool/recent', params);
    }
    async getDarkpoolTicker(ticker, params = {}) {
        return this.makeRequest(`/api/darkpool/${ticker}`, params);
    }
    // Earnings
    async getEarningsAfterhours(params = {}) {
        return this.makeRequest('/api/earnings/afterhours', params);
    }
    async getEarningsPremarket(params = {}) {
        return this.makeRequest('/api/earnings/premarket', params);
    }
    async getEarningsTicker(ticker) {
        return this.makeRequest(`/api/earnings/${ticker}`);
    }
    // ETFs
    async getETFExposure(ticker) {
        return this.makeRequest(`/api/etfs/${ticker}/exposure`);
    }
    async getETFHoldings(ticker) {
        return this.makeRequest(`/api/etfs/${ticker}/holdings`);
    }
    async getETFInOutflow(ticker) {
        return this.makeRequest(`/api/etfs/${ticker}/in-outflow`);
    }
    async getETFInfo(ticker) {
        return this.makeRequest(`/api/etfs/${ticker}/info`);
    }
    async getETFWeights(ticker) {
        return this.makeRequest(`/api/etfs/${ticker}/weights`);
    }
    // Group Flow
    async getGroupFlowGreekFlow(flowGroup) {
        return this.makeRequest(`/api/group-flow/${flowGroup}/greek-flow`);
    }
    async getGroupFlowGreekFlowExpiry(flowGroup, expiry) {
        return this.makeRequest(`/api/group-flow/${flowGroup}/greek-flow/${expiry}`);
    }
    // Insider
    async getInsiderTransactions(params = {}) {
        return this.makeRequest('/api/insider/transactions', params);
    }
    async getInsiderSectorFlow(sector) {
        return this.makeRequest(`/api/insider/${sector}/sector-flow`);
    }
    async getInsiderTicker(ticker) {
        return this.makeRequest(`/api/insider/${ticker}`);
    }
    async getInsiderTickerFlow(ticker) {
        return this.makeRequest(`/api/insider/${ticker}/ticker-flow`);
    }
    // Institutions
    async getInstitutionActivity(name) {
        return this.makeRequest(`/api/institution/${name}/activity`);
    }
    async getInstitutionHoldings(name) {
        return this.makeRequest(`/api/institution/${name}/holdings`);
    }
    async getInstitutionSectors(name) {
        return this.makeRequest(`/api/institution/${name}/sectors`);
    }
    async getInstitutionOwnership(ticker) {
        return this.makeRequest(`/api/institution/${ticker}/ownership`);
    }
    async getInstitutions(params = {}) {
        return this.makeRequest('/api/institutions', params);
    }
    async getInstitutionsLatestFilings(params = {}) {
        return this.makeRequest('/api/institutions/latest_filings', params);
    }
    // Market
    async getMarketCorrelations(params = {}) {
        return this.makeRequest('/api/market/correlations', params);
    }
    async getMarketEconomicCalendar(params = {}) {
        return this.makeRequest('/api/market/economic-calendar', params);
    }
    async getMarketFDACalendar(params = {}) {
        return this.makeRequest('/api/market/fda-calendar', params);
    }
    async getMarketInsiderBuySells(params = {}) {
        return this.makeRequest('/api/market/insider-buy-sells', params);
    }
    async getMarketTide(params = {}) {
        return this.makeRequest('/api/market/market-tide', params);
    }
    async getMarketOIChange(params = {}) {
        return this.makeRequest('/api/market/oi-change', params);
    }
    async getMarketSectorETFs(params = {}) {
        return this.makeRequest('/api/market/sector-etfs', params);
    }
    async getMarketSpike(params = {}) {
        return this.makeRequest('/api/market/spike', params);
    }
    async getMarketTotalOptionsVolume(params = {}) {
        return this.makeRequest('/api/market/total-options-volume', params);
    }
    async getMarketSectorTide(sector) {
        return this.makeRequest(`/api/market/${sector}/sector-tide`);
    }
    async getMarketETFTide(ticker) {
        return this.makeRequest(`/api/market/${ticker}/etf-tide`);
    }
    // Net Flow
    async getNetFlowExpiry(params = {}) {
        return this.makeRequest('/api/net-flow/expiry', params);
    }
    // News
    async getNewsHeadlines(params = {}) {
        return this.makeRequest('/api/news/headlines', params);
    }
    // Option Contract
    async getOptionContractFlow(id) {
        return this.makeRequest(`/api/option-contract/${id}/flow`);
    }
    async getOptionContractHistoric(id) {
        return this.makeRequest(`/api/option-contract/${id}/historic`);
    }
    async getOptionContractIntraday(id) {
        return this.makeRequest(`/api/option-contract/${id}/intraday`);
    }
    async getOptionContractVolumeProfile(id) {
        return this.makeRequest(`/api/option-contract/${id}/volume-profile`);
    }
    // Option Trades
    async getOptionTradesFlowAlerts(params = {}) {
        return this.makeRequest('/api/option-trades/flow-alerts', params);
    }
    async getOptionTradesFullTape(date) {
        return this.makeRequest(`/api/option-trades/full-tape/${date}`);
    }
    // Screeners
    async getScreenerAnalysts(params = {}) {
        return this.makeRequest('/api/screener/analysts', params);
    }
    async getScreenerOptionContracts(params = {}) {
        return this.makeRequest('/api/screener/option-contracts', params);
    }
    async getScreenerStocks(params = {}) {
        return this.makeRequest('/api/screener/stocks', params);
    }
    // Seasonality
    async getSeasonalityMarket(params = {}) {
        return this.makeRequest('/api/seasonality/market', params);
    }
    async getSeasonalityPerformers(month) {
        return this.makeRequest(`/api/seasonality/${month}/performers`);
    }
    async getSeasonalityTickerMonthly(ticker) {
        return this.makeRequest(`/api/seasonality/${ticker}/monthly`);
    }
    async getSeasonalityTickerYearMonth(ticker) {
        return this.makeRequest(`/api/seasonality/${ticker}/year-month`);
    }
    // Shorts
    async getShortsData(ticker) {
        return this.makeRequest(`/api/shorts/${ticker}/data`);
    }
    async getShortsFTDs(ticker) {
        return this.makeRequest(`/api/shorts/${ticker}/ftds`);
    }
    async getShortsInterestFloat(ticker) {
        return this.makeRequest(`/api/shorts/${ticker}/interest-float`);
    }
    async getShortsVolumeAndRatio(ticker) {
        return this.makeRequest(`/api/shorts/${ticker}/volume-and-ratio`);
    }
    async getShortsVolumesByExchange(ticker) {
        return this.makeRequest(`/api/shorts/${ticker}/volumes-by-exchange`);
    }
    // Stock
    async getStockSectorTickers(sector) {
        return this.makeRequest(`/api/stock/${sector}/tickers`);
    }
    async getStockATMChains(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/atm-chains`);
    }
    async getStockExpiryBreakdown(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/expiry-breakdown`);
    }
    async getStockFlowAlerts(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/flow-alerts`);
    }
    async getStockFlowPerExpiry(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/flow-per-expiry`);
    }
    async getStockFlowPerStrike(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/flow-per-strike`);
    }
    async getStockFlowPerStrikeIntraday(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/flow-per-strike-intraday`);
    }
    async getStockFlowRecent(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/flow-recent`);
    }
    async getStockGreekExposure(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/greek-exposure`);
    }
    async getStockGreekExposureExpiry(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/greek-exposure/expiry`);
    }
    async getStockGreekExposureStrike(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/greek-exposure/strike`);
    }
    async getStockGreekExposureStrikeExpiry(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/greek-exposure/strike-expiry`);
    }
    async getStockGreekFlow(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/greek-flow`);
    }
    async getStockGreekFlowExpiry(ticker, expiry) {
        return this.makeRequest(`/api/stock/${ticker}/greek-flow/${expiry}`);
    }
    async getStockGreeks(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/greeks`);
    }
    async getStockHistoricalRiskReversalSkew(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/historical-risk-reversal-skew`);
    }
    async getStockInfo(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/info`);
    }
    async getStockInsiderBuySells(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/insider-buy-sells`);
    }
    async getStockInterpolatedIV(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/interpolated-iv`);
    }
    async getStockIVRank(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/iv-rank`);
    }
    async getStockMaxPain(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/max-pain`);
    }
    async getStockNetPremTicks(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/net-prem-ticks`);
    }
    async getStockNOPE(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/nope`);
    }
    async getStockOHLC(ticker, candleSize) {
        return this.makeRequest(`/api/stock/${ticker}/ohlc/${candleSize}`);
    }
    async getStockOIChange(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/oi-change`);
    }
    async getStockOIPerExpiry(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/oi-per-expiry`);
    }
    async getStockOIPerStrike(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/oi-per-strike`);
    }
    async getStockOptionChains(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/option-chains`);
    }
    async getStockOptionContracts(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/option-contracts`);
    }
    async getStockOptionStockPriceLevels(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/option/stock-price-levels`);
    }
    async getStockOptionVolumeOIExpiry(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/option/volume-oi-expiry`);
    }
    async getStockOptionsVolume(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/options-volume`);
    }
    async getStockSpotExposures(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/spot-exposures`);
    }
    async getStockSpotExposuresExpiryStrike(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/spot-exposures/expiry-strike`);
    }
    async getStockSpotExposuresStrike(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/spot-exposures/strike`);
    }
    async getStockState(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/stock-state`);
    }
    async getStockVolumePriceLevels(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/stock-volume-price-levels`);
    }
    async getStockVolatilityRealized(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/volatility/realized`);
    }
    async getStockVolatilityStats(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/volatility/stats`);
    }
    async getStockVolatilityTermStructure(ticker) {
        return this.makeRequest(`/api/stock/${ticker}/volatility/term-structure`);
    }
}
const api = new UnusualWhalesAPI();
const server = new Server({
    name: "unusualwhales-mcp",
    version: "0.1.0",
}, {
    capabilities: {
        tools: {},
    },
});
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            // Alerts
            {
                name: "get_alerts",
                description: "Get triggered alerts for the user",
                inputSchema: {
                    type: "object",
                    properties: {
                        limit: { type: "number", description: "Number of results to return" },
                        page: { type: "number", description: "Page number" },
                        intraday_only: { type: "boolean", description: "Only intraday alerts" },
                        config_ids: { type: "array", items: { type: "string" }, description: "Alert configuration IDs" },
                        ticker_symbols: { type: "string", description: "Ticker symbols" },
                        noti_types: { type: "array", items: { type: "string" }, description: "Notification types" }
                    }
                }
            },
            {
                name: "get_alerts_configuration",
                description: "Get alert configurations for the user",
                inputSchema: { type: "object", properties: {} }
            },
            // Congress
            {
                name: "get_congress_trader",
                description: "Get recent reports by congress member",
                inputSchema: {
                    type: "object",
                    properties: {
                        limit: { type: "number", description: "Number of results to return" },
                        date: { type: "string", description: "Date filter (YYYY-MM-DD)" },
                        ticker: { type: "string", description: "Ticker symbol" },
                        name: { type: "string", description: "Congress member name" }
                    }
                }
            },
            {
                name: "get_congress_late_reports",
                description: "Get recent late reports by congress members",
                inputSchema: {
                    type: "object",
                    properties: {
                        limit: { type: "number", description: "Number of results to return" },
                        date: { type: "string", description: "Date filter (YYYY-MM-DD)" },
                        ticker: { type: "string", description: "Ticker symbol" }
                    }
                }
            },
            {
                name: "get_congress_recent_trades",
                description: "Get latest trades by congress members",
                inputSchema: {
                    type: "object",
                    properties: {
                        limit: { type: "number", description: "Number of results to return" },
                        date: { type: "string", description: "Date filter (YYYY-MM-DD)" },
                        ticker: { type: "string", description: "Ticker symbol" }
                    }
                }
            },
            // Darkpool
            {
                name: "get_darkpool_recent",
                description: "Get latest darkpool trades",
                inputSchema: {
                    type: "object",
                    properties: {
                        limit: { type: "number", description: "Number of results to return" },
                        date: { type: "string", description: "Date filter (YYYY-MM-DD)" },
                        min_premium: { type: "number", description: "Minimum premium" },
                        max_premium: { type: "number", description: "Maximum premium" },
                        min_size: { type: "number", description: "Minimum size" },
                        max_size: { type: "number", description: "Maximum size" },
                        min_volume: { type: "number", description: "Minimum volume" },
                        max_volume: { type: "number", description: "Maximum volume" }
                    }
                }
            },
            {
                name: "get_darkpool_ticker",
                description: "Get darkpool trades for a specific ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Ticker symbol", required: true },
                        date: { type: "string", description: "Date filter (YYYY-MM-DD)" },
                        newer_than: { type: "string", description: "Newer than timestamp" },
                        older_than: { type: "string", description: "Older than timestamp" },
                        min_premium: { type: "number", description: "Minimum premium" },
                        max_premium: { type: "number", description: "Maximum premium" },
                        min_size: { type: "number", description: "Minimum size" },
                        max_size: { type: "number", description: "Maximum size" },
                        min_volume: { type: "number", description: "Minimum volume" },
                        max_volume: { type: "number", description: "Maximum volume" },
                        limit: { type: "number", description: "Number of results to return" }
                    },
                    required: ["ticker"]
                }
            },
            // Earnings
            {
                name: "get_earnings_afterhours",
                description: "Get afterhours earnings for a date",
                inputSchema: {
                    type: "object",
                    properties: {
                        date: { type: "string", description: "Date filter (YYYY-MM-DD)" },
                        limit: { type: "number", description: "Number of results to return" },
                        page: { type: "number", description: "Page number" }
                    }
                }
            },
            {
                name: "get_earnings_premarket",
                description: "Get premarket earnings for a date",
                inputSchema: {
                    type: "object",
                    properties: {
                        date: { type: "string", description: "Date filter (YYYY-MM-DD)" },
                        limit: { type: "number", description: "Number of results to return" },
                        page: { type: "number", description: "Page number" }
                    }
                }
            },
            {
                name: "get_earnings_ticker",
                description: "Get historical earnings data for a ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            // ETFs
            {
                name: "get_etf_exposure",
                description: "Get ETF exposure data",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "ETF ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_etf_holdings",
                description: "Get ETF holdings information",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "ETF ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_etf_in_outflow",
                description: "Get ETF inflow & outflow data",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "ETF ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_etf_info",
                description: "Get ETF information",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "ETF ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_etf_weights",
                description: "Get ETF sector & country weights",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "ETF ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            // Market
            {
                name: "get_market_tide",
                description: "Get market tide data",
                inputSchema: { type: "object", properties: {} }
            },
            {
                name: "get_market_economic_calendar",
                description: "Get economic calendar events",
                inputSchema: {
                    type: "object",
                    properties: {
                        date: { type: "string", description: "Date filter (YYYY-MM-DD)" },
                        limit: { type: "number", description: "Number of results to return" }
                    }
                }
            },
            {
                name: "get_market_fda_calendar",
                description: "Get FDA calendar events",
                inputSchema: {
                    type: "object",
                    properties: {
                        date: { type: "string", description: "Date filter (YYYY-MM-DD)" },
                        limit: { type: "number", description: "Number of results to return" }
                    }
                }
            },
            {
                name: "get_market_spike",
                description: "Get SPIKE data (volatility indicator)",
                inputSchema: { type: "object", properties: {} }
            },
            {
                name: "get_market_total_options_volume",
                description: "Get total options volume across the market",
                inputSchema: { type: "object", properties: {} }
            },
            // News
            {
                name: "get_news_headlines",
                description: "Get news headlines",
                inputSchema: { type: "object", properties: {} }
            },
            // Option Trades
            {
                name: "get_option_trades_flow_alerts",
                description: "Get option flow alerts",
                inputSchema: { type: "object", properties: {} }
            },
            // Screeners
            {
                name: "get_screener_analysts",
                description: "Get analyst rating screener",
                inputSchema: { type: "object", properties: {} }
            },
            {
                name: "get_screener_option_contracts",
                description: "Get hottest chains screener (option contracts)",
                inputSchema: { type: "object", properties: {} }
            },
            {
                name: "get_screener_stocks",
                description: "Get stock screener",
                inputSchema: { type: "object", properties: {} }
            },
            // Stock
            {
                name: "get_stock_info",
                description: "Get stock information for a ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Stock ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_stock_flow_alerts",
                description: "Get flow alerts for a ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Stock ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_stock_flow_recent",
                description: "Get recent flows for a ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Stock ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_stock_option_chains",
                description: "Get option chains for a ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Stock ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_stock_greek_exposure",
                description: "Get Greek exposure for a ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Stock ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_stock_max_pain",
                description: "Get max pain data for a ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Stock ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_stock_iv_rank",
                description: "Get IV rank for a ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Stock ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            },
            {
                name: "get_stock_volatility_stats",
                description: "Get volatility statistics for a ticker",
                inputSchema: {
                    type: "object",
                    properties: {
                        ticker: { type: "string", description: "Stock ticker symbol", required: true }
                    },
                    required: ["ticker"]
                }
            }
        ],
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        let result;
        switch (name) {
            // Alerts
            case "get_alerts":
                result = await api.getAlerts(args);
                break;
            case "get_alerts_configuration":
                result = await api.getAlertsConfiguration();
                break;
            // Congress
            case "get_congress_trader":
                result = await api.getCongressTrader(args);
                break;
            case "get_congress_late_reports":
                result = await api.getCongressLateReports(args);
                break;
            case "get_congress_recent_trades":
                result = await api.getCongressRecentTrades(args);
                break;
            // Darkpool
            case "get_darkpool_recent":
                result = await api.getDarkpoolRecent(args);
                break;
            case "get_darkpool_ticker":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                const { ticker, ...otherArgs } = args;
                result = await api.getDarkpoolTicker(ticker, otherArgs);
                break;
            // Earnings
            case "get_earnings_afterhours":
                result = await api.getEarningsAfterhours(args);
                break;
            case "get_earnings_premarket":
                result = await api.getEarningsPremarket(args);
                break;
            case "get_earnings_ticker":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getEarningsTicker(args.ticker);
                break;
            // ETFs
            case "get_etf_exposure":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getETFExposure(args.ticker);
                break;
            case "get_etf_holdings":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getETFHoldings(args.ticker);
                break;
            case "get_etf_in_outflow":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getETFInOutflow(args.ticker);
                break;
            case "get_etf_info":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getETFInfo(args.ticker);
                break;
            case "get_etf_weights":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getETFWeights(args.ticker);
                break;
            // Market
            case "get_market_tide":
                result = await api.getMarketTide(args);
                break;
            case "get_market_economic_calendar":
                result = await api.getMarketEconomicCalendar(args);
                break;
            case "get_market_fda_calendar":
                result = await api.getMarketFDACalendar(args);
                break;
            case "get_market_spike":
                result = await api.getMarketSpike(args);
                break;
            case "get_market_total_options_volume":
                result = await api.getMarketTotalOptionsVolume(args);
                break;
            // News
            case "get_news_headlines":
                result = await api.getNewsHeadlines(args);
                break;
            // Option Trades
            case "get_option_trades_flow_alerts":
                result = await api.getOptionTradesFlowAlerts(args);
                break;
            // Screeners
            case "get_screener_analysts":
                result = await api.getScreenerAnalysts(args);
                break;
            case "get_screener_option_contracts":
                result = await api.getScreenerOptionContracts(args);
                break;
            case "get_screener_stocks":
                result = await api.getScreenerStocks(args);
                break;
            // Stock
            case "get_stock_info":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getStockInfo(args.ticker);
                break;
            case "get_stock_flow_alerts":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getStockFlowAlerts(args.ticker);
                break;
            case "get_stock_flow_recent":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getStockFlowRecent(args.ticker);
                break;
            case "get_stock_option_chains":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getStockOptionChains(args.ticker);
                break;
            case "get_stock_greek_exposure":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getStockGreekExposure(args.ticker);
                break;
            case "get_stock_max_pain":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getStockMaxPain(args.ticker);
                break;
            case "get_stock_iv_rank":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getStockIVRank(args.ticker);
                break;
            case "get_stock_volatility_stats":
                if (!args?.ticker) {
                    throw new McpError(ErrorCode.InvalidParams, "ticker parameter is required");
                }
                result = await api.getStockVolatilityStats(args.ticker);
                break;
            default:
                throw new McpError(ErrorCode.MethodNotFound, `Tool ${name} not found`);
        }
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }
    catch (error) {
        if (error instanceof McpError) {
            throw error;
        }
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new McpError(ErrorCode.InternalError, `Error calling tool ${name}: ${errorMessage}`);
    }
});
async function main() {
    const argv = await yargs(hideBin(process.argv))
        .option('stdio', {
        type: 'boolean',
        default: true,
        description: 'Use stdio transport'
    })
        .help()
        .argv;
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((error) => {
        console.error("Server error:", error);
        process.exit(1);
    });
}
