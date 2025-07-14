# Unusual Whales MCP Server

A Model Context Protocol (MCP) server that provides access to the Unusual Whales API for financial data, options flow analysis, and market intelligence.

## Features

- **81 API endpoints** across 12 categories
- **33 MCP tools** for the most commonly used functions
- Real-time options flow alerts
- Congressional trading data
- Dark pool analysis
- Market-wide indicators
- ETF analytics
- Earnings calendars
- Institutional data
- And much more!

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd unusualwhales-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

1. Copy the environment example file:
```bash
cp .env.example .env
```

2. Add your Unusual Whales API key to `.env`:
```
UNUSUAL_WHALES_API_KEY=your_api_key_here
```

You can obtain an API key from [Unusual Whales](https://unusualwhales.com/).

## Usage

### As an MCP Server

Add the server to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "unusualwhales": {
      "command": "node",
      "args": ["/path/to/unusualwhales-mcp/build/index.js"]
    }
  }
}
```

### Available Tools

#### Stock Analysis
- `get_stock_info` - Get basic stock information
- `get_stock_flow_alerts` - Get options flow alerts for a ticker
- `get_stock_flow_recent` - Get recent options flows
- `get_stock_option_chains` - Get option chains data
- `get_stock_greek_exposure` - Get Greeks exposure analysis
- `get_stock_max_pain` - Get max pain calculations
- `get_stock_iv_rank` - Get IV rank percentiles
- `get_stock_volatility_stats` - Get volatility statistics

#### Market Data
- `get_market_tide` - Get overall market sentiment
- `get_market_economic_calendar` - Get economic events
- `get_market_fda_calendar` - Get FDA calendar events
- `get_market_spike` - Get SPIKE volatility indicator
- `get_market_total_options_volume` - Get market-wide options volume

#### Congress & Insider Trading
- `get_congress_trader` - Get congress member trading data
- `get_congress_late_reports` - Get late filing reports
- `get_congress_recent_trades` - Get recent congressional trades

#### Dark Pool Analysis
- `get_darkpool_recent` - Get recent dark pool prints
- `get_darkpool_ticker` - Get dark pool data for specific ticker

#### ETF Analysis
- `get_etf_exposure` - Get ETF sector/geographic exposure
- `get_etf_holdings` - Get ETF holdings breakdown
- `get_etf_in_outflow` - Get ETF flow data
- `get_etf_info` - Get ETF information
- `get_etf_weights` - Get ETF sector weights

#### Earnings & Events
- `get_earnings_afterhours` - Get after-hours earnings
- `get_earnings_premarket` - Get pre-market earnings
- `get_earnings_ticker` - Get historical earnings for ticker

#### Alerts & Screening
- `get_alerts` - Get triggered user alerts
- `get_alerts_configuration` - Get alert configurations
- `get_option_trades_flow_alerts` - Get options flow alerts
- `get_screener_analysts` - Get analyst ratings screener
- `get_screener_option_contracts` - Get hottest chains screener
- `get_screener_stocks` - Get stock screener results

#### News
- `get_news_headlines` - Get financial news headlines

## API Categories

The server provides access to all Unusual Whales API endpoints organized into these categories:

- **Alerts** (2 endpoints) - Custom alerts and configurations
- **Congress** (3 endpoints) - Congressional trading data
- **Darkpool** (2 endpoints) - Dark pool trading analysis
- **Earnings** (3 endpoints) - Earnings calendars and data
- **ETFs** (5 endpoints) - ETF analysis and holdings
- **Group Flow** (2 endpoints) - Grouped options flow data
- **Insider** (4 endpoints) - Insider trading information
- **Institutions** (6 endpoints) - Institutional holdings and activity
- **Market** (9 endpoints) - Market-wide data and indicators
- **Net Flow** (1 endpoint) - Net options flow by expiry
- **News** (1 endpoint) - Financial news headlines
- **Option Contract** (4 endpoints) - Individual contract analysis
- **Option Trades** (2 endpoints) - Options flow and alerts
- **Screeners** (3 endpoints) - Stock and options screening tools
- **Seasonality** (4 endpoints) - Seasonal market patterns
- **Shorts** (5 endpoints) - Short interest and volume data
- **Socket** (6 endpoints) - Real-time WebSocket channels
- **Stock** (27 endpoints) - Comprehensive stock analysis

## Example Usage

```javascript
// Get recent options flows for AAPL
const flows = await server.callTool("get_stock_flow_recent", { ticker: "AAPL" });

// Get market sentiment
const tide = await server.callTool("get_market_tide", {});

// Get congressional trades for NVDA
const congressTrades = await server.callTool("get_congress_recent_trades", { ticker: "NVDA" });

// Get dark pool activity
const darkPool = await server.callTool("get_darkpool_recent", { limit: 50 });
```

## Development

### Scripts

- `npm run build` - Compile TypeScript and make executable
- `npm run watch` - Watch for changes and recompile
- `npm run inspector` - Launch MCP inspector for debugging
- `npm run prepare` - Prepare package for publishing

### Project Structure

```
unusualwhales-mcp/
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript output
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Environment variables template
└── README.md            # This file
```

## Error Handling

The server includes comprehensive error handling:

- **Authentication errors** - Invalid or missing API key
- **Rate limiting** - API rate limit exceeded
- **Parameter validation** - Missing required parameters
- **Network errors** - Connection timeouts and failures
- **API errors** - Unusual Whales API error responses

## Rate Limits

Please be aware of Unusual Whales API rate limits. The server includes a 30-second timeout for requests to prevent hanging connections.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is for educational and research purposes only. Always verify data independently before making trading decisions. The authors are not responsible for any financial losses incurred from using this software.

## Support

For issues and feature requests, please use the GitHub issue tracker.

For Unusual Whales API documentation and support, visit [Unusual Whales](https://unusualwhales.com/).
