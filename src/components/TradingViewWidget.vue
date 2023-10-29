<template>

    <div class="container">

      <div class="header">
        <h2>ZERODHA</h2>
      </div>


      <span class="title">Zerodha - Stock Visualizer</span>
      <span class="subtitle">Ride the waves of opportunity! Zerodha - Your compass to conquering the stock market with style</span>
     
      <div class="input">
      <label for="symbol">Stock Symbol:</label>
      <input v-model="symbol" id="symbol" placeholder="Eg: AAPL" />
      
      <label for="period">Interval:</label>
      <select v-model="period" id="period">
        <option value="daily">Daily</option>
        <option value="hourly">Hourly</option>
      </select>

      <button @click="fetchData">Fetch Data</button>

    </div>
    <div v-if="chartData" :id="containerId" class="innerContainer">
      <ChartData :data="chartData" />
    </div>
     
      <div :id="containerId" class="innerContainer"></div>
      <div class="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank"></a>
      </div>

    <!-- Footer with contact section -->
    <footer>
      <div class="footer">
        <h2>ZERODHA</h2>
        <p>© 2010 - {{ currentYear }}, Zerodha Broking Ltd.</p>
        <p>All rights reserved.</p>
        
      </div>
    </footer>

    </div>
    
    

  </template>
  
 

  

  <script>
  /* eslint-disable no-undef */
  import axios from 'axios';
  import ChartData from './ChartData.vue';
export default {
  data(){
    return{
      currentYear: new Date().getFullYear(),
      symbol: '',
      period: 'daily',
      chartData: null,
    }
  },

  props: {
    containerId: {
      type: String,
      default: 'tradingview-widget',
    },
  },
  mounted() {
    this.loadTradingViewScript();
  },
  methods: {
    loadTradingViewScript() {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = this.initializeTradingViewWidget;

      document.head.appendChild(script);
    },
    initializeTradingViewWidget() {
      new TradingView.widget({
        autosize: true,
        symbol: 'NASDAQ:AAPL',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'in',
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        hotlist: true,
        calendar: true,
        container_id: this.containerId,
      });
    },

    fetchData(){
    axios.get(`http://localhost:${process.env.PORT}/api/search`,{
      params: 
      {symbol: this.symbol,
      period: this.period,
    
      }
    }).then(response=>{
      this.chartData = response.data;
   
    }).catch(error=>{
      console.log("Error fetching mock data", error)
    })
  }
    },

  components: {
    ChartData,
  },

};
</script>

  
  <style scoped>
  @import '../assets/style.css';
  </style>
  