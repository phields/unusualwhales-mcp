import { z } from "zod";

const BASE_URL = "https://api.unusualwhales.com";

interface ApiResponse {
  [key: string]: any;
}

export interface EnvironmentConfig {
  UNUSUAL_WHALES_API_KEY?: string;
}

// Core API client class
class UnusualWhalesAPI {
  private apiKey: string;

  constructor(config?: EnvironmentConfig) {
    // 优先使用传入的配置，否则尝试从 process.env 获取（如果存在）
    this.apiKey = config?.UNUSUAL_WHALES_API_KEY || 
                  (typeof process !== 'undefined' && process.env?.UNUSUAL_WHALES_API_KEY) || 
                  '';
    
    if (!this.apiKey) {
      throw new Error("UNUSUAL_WHALES_API_KEY is required. Pass it in config or set as environment variable.");
    }
  }
  
  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse> {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
      );

      // 构建查询字符串
      const searchParams = new URLSearchParams();
      Object.entries(cleanParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, String(v)));
        } else {
          searchParams.append(key, String(value));
        }
      });

      const url = `${BASE_URL}${endpoint}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;

      // 创建 AbortController 用于超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.text();
          let errorMessage;
          try {
            const parsed = JSON.parse(errorData);
            errorMessage = parsed.message || errorData;
          } catch {
            errorMessage = errorData;
          }
          throw new Error(`API Error (${response.status}): ${errorMessage}`);
        }

        return await response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Request failed: ${String(error)}`);
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

// Global API client instance (backward compatibility)
let unusualWhalesAPI: UnusualWhalesAPI | null = null;

// Initialize function that supports environment config
export function initializeUnusualWhalesAPI(config?: EnvironmentConfig): UnusualWhalesAPI {
  unusualWhalesAPI = new UnusualWhalesAPI(config);
  return unusualWhalesAPI;
}

// Get the current API client instance
export function getUnusualWhalesAPI(): UnusualWhalesAPI {
  if (!unusualWhalesAPI) {
    // 检查是否在 Node.js 环境中且有 process.env
    if (typeof process !== 'undefined' && process.env?.UNUSUAL_WHALES_API_KEY) {
      // 尝试使用默认配置初始化
      unusualWhalesAPI = new UnusualWhalesAPI();
    } else {
      throw new Error('UnusualWhalesAPI not initialized. Please call initializeUnusualWhalesAPI() with your API key first.');
    }
  }
  return unusualWhalesAPI;
}

// 检查是否可以自动初始化（仅在 Node.js 环境中）
function canAutoInitialize(): boolean {
  return typeof process !== 'undefined' && 
         typeof process.env !== 'undefined' && 
         !!process.env.UNUSUAL_WHALES_API_KEY;
}

// 为了向后兼容，尝试自动初始化（仅在合适的环境中）
if (canAutoInitialize()) {
  try {
    unusualWhalesAPI = new UnusualWhalesAPI();
  } catch (error) {
    // 如果自动初始化失败，保持为 null
    console.warn('Unable to auto-initialize UnusualWhalesAPI. Please call initializeUnusualWhalesAPI() with your API key.');
  }
}

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
  return getUnusualWhalesAPI().getAlerts(params);
}

export async function getAlertsConfiguration(): Promise<any> {
  return getUnusualWhalesAPI().getAlertsConfiguration();
}

export async function getCongressTrader(params: z.infer<typeof getCongressTraderSchema>): Promise<any> {
  return getUnusualWhalesAPI().getCongressTrader(params);
}

export async function getCongressLateReports(params: any = {}): Promise<any> {
  return getUnusualWhalesAPI().getCongressLateReports(params);
}

export async function getCongressRecentTrades(params: any = {}): Promise<any> {
  return getUnusualWhalesAPI().getCongressRecentTrades(params);
}

export async function getDarkpoolRecent(params: any = {}): Promise<any> {
  return getUnusualWhalesAPI().getDarkpoolRecent(params);
}

export async function getDarkpoolTicker(params: z.infer<typeof getDarkpoolTickerSchema>): Promise<any> {
  const { ticker, ...otherParams } = params;
  return getUnusualWhalesAPI().getDarkpoolTicker(ticker, otherParams);
}

export async function getEarningsAfterhours(params: any = {}): Promise<any> {
  return getUnusualWhalesAPI().getEarningsAfterhours(params);
}

export async function getEarningsPremarket(params: any = {}): Promise<any> {
  return getUnusualWhalesAPI().getEarningsPremarket(params);
}

export async function getEarningsTicker(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getEarningsTicker(params.ticker);
}

export async function getETFExposure(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getETFExposure(params.ticker);
}

export async function getETFHoldings(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getETFHoldings(params.ticker);
}

export async function getETFInOutflow(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getETFInOutflow(params.ticker);
}

export async function getETFInfo(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getETFInfo(params.ticker);
}

export async function getETFWeights(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getETFWeights(params.ticker);
}

export async function getMarketTide(): Promise<any> {
  return getUnusualWhalesAPI().getMarketTide();
}

export async function getMarketEconomicCalendar(params: any = {}): Promise<any> {
  return getUnusualWhalesAPI().getMarketEconomicCalendar(params);
}

export async function getMarketFDACalendar(params: any = {}): Promise<any> {
  return getUnusualWhalesAPI().getMarketFDACalendar(params);
}

export async function getMarketSpike(): Promise<any> {
  return getUnusualWhalesAPI().getMarketSpike();
}

export async function getMarketTotalOptionsVolume(): Promise<any> {
  return getUnusualWhalesAPI().getMarketTotalOptionsVolume();
}

export async function getNewsHeadlines(params: any = {}): Promise<any> {
  return getUnusualWhalesAPI().getNewsHeadlines(params);
}

export async function getOptionTradesFlowAlerts(params: any = {}): Promise<any> {
  return getUnusualWhalesAPI().getOptionTradesFlowAlerts(params);
}

export async function getScreenerAnalysts(): Promise<any> {
  return getUnusualWhalesAPI().getScreenerAnalysts();
}

export async function getScreenerOptionContracts(): Promise<any> {
  return getUnusualWhalesAPI().getScreenerOptionContracts();
}

export async function getScreenerStocks(): Promise<any> {
  return getUnusualWhalesAPI().getScreenerStocks();
}

export async function getStockInfo(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getStockInfo(params.ticker);
}

export async function getStockFlowAlerts(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getStockFlowAlerts(params.ticker);
}

export async function getStockFlowRecent(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getStockFlowRecent(params.ticker);
}

export async function getStockOptionChains(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getStockOptionChains(params.ticker);
}

export async function getStockGreekExposure(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getStockGreekExposure(params.ticker);
}

export async function getStockMaxPain(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getStockMaxPain(params.ticker);
}

export async function getStockIVRank(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getStockIVRank(params.ticker);
}

export async function getStockVolatilityStats(params: z.infer<typeof getTickerSchema>): Promise<any> {
  return getUnusualWhalesAPI().getStockVolatilityStats(params.ticker);
}