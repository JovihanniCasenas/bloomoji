import { BetaAnalyticsDataClient } from "@google-analytics/data";

function getAnalyticsClient() {
    const keyJson = process.env.GA_SERVICE_ACCOUNT_KEY;
      if (keyJson) {
        const credentials = JSON.parse(keyJson);
        return new BetaAnalyticsDataClient({ credentials });
      }
      // Falls back to GOOGLE_APPLICATION_CREDENTIALS env var or ADC
      return new BetaAnalyticsDataClient();
}

export const analyticsDataClient = getAnalyticsClient();