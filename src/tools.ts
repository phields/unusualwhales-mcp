import axios from "axios";
import { z } from "zod";

const API_KEY = process.env.UNUSUAL_WHALES_API_KEY;
if (!API_KEY) {
  throw new Error("UNUSUAL_WHALES_API_KEY environment variable is required");
}

const BASE_URL = "https://api.unusualwhales.com";

interface ApiResponse {
  [key: string]: any;
}

// Core API client class
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

// Initialize the API client
const unusualWhalesAPI = new UnusualWhalesAPI();

// Schema definitions
export const getAlertsSchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  intraday_only: z.boolean().optional(),
  config_ids: z.array(z.string()).optional(),
  ticker_symbols: z.string().optional(),
  noti_types: z.array(z.string()).optional()
});

export const getCongressTraderSchema = z.object({
  limit: z.number().optional(),
  date: z.string().optional(),
  ticker: z.string().optional(),
  name: z.string().optional()
});

export const getDarkpoolTickerSchema = z.object({
  ticker: z.string(),
  date: z.string().optional(),
  newer_than: z.string().optional(),
  older_than: z.string().optional(),
  min_premium: z.number().optional(),
  max_premium: z.number().optional(),
  min_size: z.number().optional(),
  max_size: z.number().optional(),
  min_volume: z.number().optional(),
  max_volume: z.number().optional(),
  limit: z.number().optional()
});

export const getTickerSchema = z.object({
  ticker: z.string()
});

// Core tool functions
export async function getAlerts(params: z.infer<typeof getAlertsSchema>): Promise<any> {
  return unusualWhalesAPI.getAlerts(params);
}

export async function getAlertsConfiguration(): Promise<any> {
  return unusualWhalesAPI.getAlertsConfiguration();
}

export async function getCongressTrader(params: z.infer<typeof getCongressTraderSchema>): Promise<any> {
  return unusualWhalesAPI.getCongressTrader(params);
}

export async function getCongressLateReports(params: any = {}): Promise<any> {
  return unusualWhalesAPI.getCongressLateReports(params);
}

export async function getCongressRecentTrades(params: any = {}): Promise<any> {
  return unusualWhalesAPI.getCongressRecentTrades(params);
}

export async function getDarkpoolRecent(params: any = {}): Promise<any> {
  return unusualWhalesAPI.getDarkpoolRecent(params);
}

export async function getDarkpoolTicker(params: z.infer<typeof getDarkpoolTickerSchema>): Promise<any> {
  const { ticker, ...otherParams } = params;
  return unusualWhalesAPI.getDarkpoolTicker(ticker, otherParams);
}

export async function getEarningsAfterhours(params: any = {}): Promise<any> {
  return unusualWhalesAPI.getEarningsAfterhours(params);
}

export async function getEarningsPremarket(params: any = {}): Promise<any> {
  return unusualWhalesAPI.getEarningsPremarket(params);
}

export async function getEarningsTicker(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getEarningsTicker(params.ticker);
}

export async function getETFExposure(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getETFExposure(params.ticker);
}

export async function getETFHoldings(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getETFHoldings(params.ticker);
}

export async function getETFInOutflow(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getETFInOutflow(params.ticker);
}

export async function getETFInfo(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getETFInfo(params.ticker);
}

export async function getETFWeights(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getETFWeights(params.ticker);
}

export async function getMarketTide(): Promise<any> {
  return unusualWhalesAPI.getMarketTide();
}

export async function getMarketEconomicCalendar(params: any = {}): Promise<any> {
  return unusualWhalesAPI.getMarketEconomicCalendar(params);
}

export async function getMarketFDACalendar(params: any = {}): Promise<any> {
  return unusualWhalesAPI.getMarketFDACalendar(params);
}

export async function getMarketSpike(): Promise<any> {
  return unusualWhalesAPI.getMarketSpike();
}

export async function getMarketTotalOptionsVolume(): Promise<any> {
  return unusualWhalesAPI.getMarketTotalOptionsVolume();
}

export async function getNewsHeadlines(): Promise<any> {
  return unusualWhalesAPI.getNewsHeadlines();
}

export async function getOptionTradesFlowAlerts(): Promise<any> {
  return unusualWhalesAPI.getOptionTradesFlowAlerts();
}

export async function getScreenerAnalysts(): Promise<any> {
  return unusualWhalesAPI.getScreenerAnalysts();
}

export async function getScreenerOptionContracts(): Promise<any> {
  return unusualWhalesAPI.getScreenerOptionContracts();
}

export async function getScreenerStocks(): Promise<any> {
  return unusualWhalesAPI.getScreenerStocks();
}

export async function getStockInfo(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getStockInfo(params.ticker);
}

export async function getStockFlowAlerts(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getStockFlowAlerts(params.ticker);
}

export async function getStockFlowRecent(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getStockFlowRecent(params.ticker);
}

export async function getStockOptionChains(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getStockOptionChains(params.ticker);
}

export async function getStockGreekExposure(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getStockGreekExposure(params.ticker);
}

export async function getStockMaxPain(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getStockMaxPain(params.ticker);
}

export async function getStockIVRank(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getStockIVRank(params.ticker);
}

export async function getStockVolatilityStats(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return unusualWhalesAPI.getStockVolatilityStats(params.ticker);
}