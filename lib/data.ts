import type {
  SmsProfile,
  SegmentDefinition,
  SegmentId,
  SegmentBusinessModel,
  SegmentMarketSize,
  ConsolidatedFinancials,
  HistoryEvent,
  StrategicPlan,
  IRSource,
} from "./types";

import companyData from "@/data/company.json";
import segmentsData from "@/data/segments.json";
import financialsData from "@/data/financials.json";
import historyData from "@/data/history.json";
import businessModelsData from "@/data/business-models.json";
import marketSizingData from "@/data/market-sizing.json";
import strategiesData from "@/data/strategies.json";
import sourcesData from "@/data/sources.json";

export function getCompanyProfile(): SmsProfile {
  return companyData as SmsProfile;
}

export function getSegments(): SegmentDefinition[] {
  return segmentsData as SegmentDefinition[];
}

export function getSegmentById(id: SegmentId): SegmentDefinition | undefined {
  return (segmentsData as SegmentDefinition[]).find((s) => s.id === id);
}

export function getFinancials(): ConsolidatedFinancials {
  return financialsData as ConsolidatedFinancials;
}

export function getHistory(): HistoryEvent[] {
  return historyData as HistoryEvent[];
}

export function getBusinessModels(): SegmentBusinessModel[] {
  return businessModelsData as SegmentBusinessModel[];
}

export function getBusinessModelBySegment(segmentId: SegmentId): SegmentBusinessModel | undefined {
  return (businessModelsData as SegmentBusinessModel[]).find((bm) => bm.segmentId === segmentId);
}

export function getMarketSizing(): SegmentMarketSize[] {
  return marketSizingData as SegmentMarketSize[];
}

export function getMarketSizingBySegment(segmentId: SegmentId): SegmentMarketSize | undefined {
  return (marketSizingData as SegmentMarketSize[]).find((ms) => ms.segmentId === segmentId);
}

export function getStrategies(): StrategicPlan[] {
  return strategiesData as StrategicPlan[];
}

export function getSources(): IRSource[] {
  return sourcesData as IRSource[];
}

export function getSourceById(id: string): IRSource | undefined {
  return (sourcesData as IRSource[]).find((s) => s.id === id);
}
