# Unusual Whales MCP Server

[![npm version](https://badge.fury.io/js/unusualwhales-mcp.svg)](https://badge.fury.io/js/unusualwhales-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server that provides access to the Unusual Whales API for financial data, options flow analysis, and market intelligence.

## Features

- **🚀 Fast and lightweight** - Direct API access without heavy dependencies
- **📊 Comprehensive data** - 33 tools covering 12 financial data categories
- **🔄 Real-time insights** - Options flow alerts, market sentiment, and live data
- **🏛️ Congressional tracking** - Monitor politician trading activity
- **🌊 Dark pool analysis** - Track institutional block trades
- **📈 Market intelligence** - ETF flows, earnings data, and volatility metrics

## Requirements

- Node.js 18+
- Valid Unusual Whales API key
- Compatible with Claude Desktop, VS Code, and other MCP clients

## Installation

The server is available as an npm package and can be installed in multiple ways:

### Quick Start

```bash
npx unusualwhales-mcp
```

### Global Installation

```bash
npm install -g unusualwhales-mcp
```

### Local Installation

```bash
npm install unusualwhales-mcp
```

## Configuration

### Environment Setup

1. Obtain an API key from [Unusual Whales](https://unusualwhales.com/)
2. Set the environment variable:

```bash
export UNUSUAL_WHALES_API_KEY=your_api_key_here
```

Or create a `.env` file:

```env
UNUSUAL_WHALES_API_KEY=your_api_key_here
```

### MCP Client Configuration

#### Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "unusualwhales": {
      "command": "npx",
      "args": ["unusualwhales-mcp"],
      "env": {
        "UNUSUAL_WHALES_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

#### VS Code (via MCP extension)

```json
{
  "mcpServers": {
    "unusualwhales": {
      "command": "npx",
      "args": ["unusualwhales-mcp"]
    }
  }
}
```

#### Other MCP Clients

The server works with any MCP-compatible client. Use the command:

```bash
npx unusualwhales-mcp
```

## Available Tools

### 📊 Stock Analysis
- `get_stock_info` - Get comprehensive stock information
- `get_stock_flow_alerts` - Get options flow alerts for a ticker
- `get_stock_flow_recent` - Get recent options flows
- `get_stock_option_chains` - Get option chains data
- `get_stock_greek_exposure` - Get Greeks exposure analysis
- `get_stock_max_pain` - Get max pain calculations
- `get_stock_iv_rank` - Get IV rank percentiles
- `get_stock_volatility_stats` - Get volatility statistics

### 🌊 Market Data
- `get_market_tide` - Get overall market sentiment indicator
- `get_market_economic_calendar` - Get economic events calendar
- `get_market_fda_calendar` - Get FDA calendar events
- `get_market_spike` - Get SPIKE volatility indicator
- `get_market_total_options_volume` - Get market-wide options volume

### 🏛️ Congressional & Insider Trading
- `get_congress_trader` - Get congress member trading data
- `get_congress_late_reports` - Get late filing reports
- `get_congress_recent_trades` - Get recent congressional trades

### 🌑 Dark Pool Analysis
- `get_darkpool_recent` - Get recent dark pool prints
- `get_darkpool_ticker` - Get dark pool data for specific ticker

### 📈 ETF Analysis
- `get_etf_exposure` - Get ETF sector/geographic exposure
- `get_etf_holdings` - Get ETF holdings breakdown
- `get_etf_in_outflow` - Get ETF flow data
- `get_etf_info` - Get ETF information
- `get_etf_weights` - Get ETF sector weights

### 📅 Earnings & Events
- `get_earnings_afterhours` - Get after-hours earnings
- `get_earnings_premarket` - Get pre-market earnings
- `get_earnings_ticker` - Get historical earnings for ticker

### 🔔 Alerts & Screening
- `get_alerts` - Get triggered user alerts
- `get_alerts_configuration` - Get alert configurations
- `get_option_trades_flow_alerts` - Get options flow alerts
- `get_screener_analysts` - Get analyst ratings screener
- `get_screener_option_contracts` - Get hottest chains screener
- `get_screener_stocks` - Get stock screener results

### 📰 News
- `get_news_headlines` - Get financial news headlines

## Usage Examples

### Basic Stock Analysis

```javascript
// Get recent options flows for AAPL
const flows = await server.callTool("get_stock_flow_recent", { 
  ticker: "AAPL" 
});

// Get comprehensive stock info
const info = await server.callTool("get_stock_info", { 
  ticker: "TSLA" 
});
```

### Market Sentiment

```javascript
// Get overall market sentiment
const tide = await server.callTool("get_market_tide", {});

// Get volatility spike indicator
const spike = await server.callTool("get_market_spike", {});
```

### Congressional Trading

```javascript
// Get recent congressional trades for NVDA
const congressTrades = await server.callTool("get_congress_recent_trades", { 
  ticker: "NVDA" 
});

// Get trades by specific congress member
const memberTrades = await server.callTool("get_congress_trader", { 
  name: "Nancy Pelosi" 
});
```

### Dark Pool Activity

```javascript
// Get recent dark pool activity
const darkPool = await server.callTool("get_darkpool_recent", { 
  limit: 50 
});

// Get dark pool data for specific ticker
const tickerDarkPool = await server.callTool("get_darkpool_ticker", { 
  ticker: "SPY" 
});
```

## API Coverage

The server provides access to **81 API endpoints** across **12 categories**:

| Category | Endpoints | Description |
|----------|-----------|-------------|
| **Alerts** | 2 | Custom alerts and configurations |
| **Congress** | 3 | Congressional trading data |
| **Darkpool** | 2 | Dark pool trading analysis |
| **Earnings** | 3 | Earnings calendars and data |
| **ETFs** | 5 | ETF analysis and holdings |
| **Group Flow** | 2 | Grouped options flow data |
| **Insider** | 4 | Insider trading information |
| **Institutions** | 6 | Institutional holdings and activity |
| **Market** | 9 | Market-wide data and indicators |
| **Net Flow** | 1 | Net options flow by expiry |
| **News** | 1 | Financial news headlines |
| **Option Contract** | 4 | Individual contract analysis |
| **Option Trades** | 2 | Options flow and alerts |
| **Screeners** | 3 | Stock and options screening tools |
| **Seasonality** | 4 | Seasonal market patterns |
| **Shorts** | 5 | Short interest and volume data |
| **Stock** | 27 | Comprehensive stock analysis |

## Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/unusualwhales-mcp.git
cd unusualwhales-mcp

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your API key

# Build the project
npm run build

# Run the server
npm start
```

### Available Scripts

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
template
└── README.md            # This file
```

## Rate Limits

Please be aware of Unusual Whales API rate limits. The server includes:
- 30-second timeout for requests
- Proper error handling for rate limit responses
- Retry logic for transient failures

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

⚠️ **Important**: This software is for educational and research purposes only. Always verify data independently before making trading decisions. The authors are not responsible for any financial losses incurred from using this software.

## Support

- **Issues**: [GitHub Issues](https://github.com/phields/unusualwhales-mcp/issues)
- **API Documentation**: [Unusual Whales API Docs](https://unusualwhales.com/api)

## Related Projects

- [Model Context Protocol](https://github.com/modelcontextprotocol/python-sdk) - Official MCP implementation
- [Claude Desktop](https://claude.ai/download) - AI assistant with MCP support
- [Unusual Whales](https://unusualwhales.com/) - Financial data platform

---

**Made with ❤️ for niedasen@kasagi.cn**