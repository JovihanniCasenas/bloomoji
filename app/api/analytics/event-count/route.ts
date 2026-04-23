import { NextRequest, NextResponse } from "next/server";
import { analyticsDataClient } from "@/lib/analytics";

const propertyId = process.env.GA_PROPERTY_ID;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventName = searchParams.get("event");

  if (!eventName) {
    return NextResponse.json({ error: "Missing event parameter" }, { status: 400 });
  }

  if (!propertyId) {
    return NextResponse.json({ error: "GA_PROPERTY_ID is not configured" }, { status: 500 });
  }

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: {
            matchType: "EXACT",
            value: eventName,
          },
        },
      },
    });

    const count = response.rows?.[0]?.metricValues?.[0]?.value ?? "0";

    return NextResponse.json({ event: eventName, count: parseInt(count, 10) });
  } catch (err) {
    console.error("Failed to fetch GA event count:", err);
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 });
  }
}
