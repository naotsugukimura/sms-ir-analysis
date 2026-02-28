// IR Source References
export interface IRSource {
  id: string;
  title: string;
  type: "presentation" | "tanshin" | "yuho" | "timely" | "other";
  fiscalPeriod: string;
  publishDate: string;
  pdfUrl?: string;
  irPageUrl?: string;
}

// Company Profile
export interface SmsProfile {
  name: string;
  nameEn: string;
  stockCode: string;
  market: string;
  founded: string;
  mission: string;
  missionDescription: string;
  ceo: string;
  employeeCount: number;
  headquarters: string;
  brandColor: string;
  irUrl: string;
  sourceRef: string;
}

// Segment Definitions
export type SegmentId = "career" | "care-saas" | "healthcare" | "international";

export interface SubService {
  name: string;
  description: string;
  launchYear: number;
  status: "core" | "growing" | "new" | "sunset";
}

export interface SegmentDefinition {
  id: SegmentId;
  name: string;
  nameEn: string;
  color: string;
  icon: string;
  description: string;
  revenueShareLatest: number;
  subServices: SubService[];
  sourceRef: string;
}

// Business Model (flow chart data)
export interface FlowNode {
  id: string;
  label: string;
  type: "sms" | "customer" | "end-user" | "government" | "partner" | "platform";
  description?: string;
  position: { x: number; y: number };
}

export type FlowType = "money" | "service" | "information" | "data" | "contract";

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type: FlowType;
  description?: string;
}

export interface SegmentBusinessModel {
  segmentId: SegmentId;
  summary: string;
  valueProposition: string;
  revenueModel: string;
  customerSegment: string;
  keyMetrics: string[];
  nodes: FlowNode[];
  edges: FlowEdge[];
  sourceRef: string;
}

// Market Sizing
export interface SegmentMarketSize {
  segmentId: SegmentId;
  tam: { value: number; unit: string; year: number; description: string };
  growthRate: number;
  growthDrivers: string[];
  competitiveLandscape: string;
  sourceRef: string;
}

// Segment-level Financials
export interface SegmentFinancialYear {
  year: string;
  fiscalYearLabel: string;
  revenue: number;
  operatingProfit: number;
  operatingMargin: number;
  kpis?: Record<string, { value: number | string; unit: string; label: string }>;
  sourceRef: string;
}

export interface SegmentFinancials {
  segmentId: SegmentId;
  currency: "JPY";
  unit: "million";
  fiscalYears: SegmentFinancialYear[];
}

// Consolidated Financials
export interface ConsolidatedFiscalYear {
  year: string;
  fiscalYearLabel: string;
  revenue: number;
  operatingProfit: number;
  ordinaryProfit?: number;
  netIncome: number;
  operatingMargin: number;
  roe?: number;
  employees?: number;
  segments: { segmentId: SegmentId; revenue: number; profit: number }[];
  operatingCF?: number;
  investingCF?: number;
  financingCF?: number;
  freeCF?: number;
  sourceRef: string;
}

export interface ConsolidatedFinancials {
  currency: "JPY";
  unit: "million";
  fiscalYears: ConsolidatedFiscalYear[];
}

// History Events
export type HistoryCategory =
  | "founding" | "ipo" | "ma" | "new_business"
  | "policy" | "management" | "milestone" | "expansion";

export interface HistoryEvent {
  year: number;
  month?: number;
  category: HistoryCategory;
  title: string;
  description: string;
  relatedSegment?: SegmentId;
  significance: "high" | "medium" | "low";
  sourceRef?: string;
}

// Strategy
export interface StrategicPlan {
  name: string;
  period: string;
  targets: {
    revenue?: number;
    operatingProfit?: number;
    epsGrowthRate?: number;
    roeTarget?: number;
    description: string;
  };
  keyStrategies: {
    title: string;
    description: string;
    relatedSegments: SegmentId[];
  }[];
  sourceRef: string;
}
