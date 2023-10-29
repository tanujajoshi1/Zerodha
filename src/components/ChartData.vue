<template>
          <div :id="containerId" class="innerContainer"></div>
      <div class="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank"></a>
      </div>
</template>



<script>
/* eslint-disable no-undef */
// eslint-disable-next-line
/* eslint-disable */
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      containerId: 'tradingview-chart', // You can customize the container ID
    };
  },
  mounted() {
    console.log('Received data:', this.data);
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
        if (this.chartData) {
      new TradingView.widget({
        autosize: true,
        symbol: this.data.symbol,
        interval: this.data.period === 'daily' ? 'D' : '1H',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'in',
        enable_publishing: false,
        withdateranges: true,
        allow_symbol_change: false,
        container_id: this.containerId,
      });
    } else {
    console.error('Invalid data structure:', this.data);
  }
    },
  },
};
</script>

<style scoped>
@import '../assets/style.css'
</style>
