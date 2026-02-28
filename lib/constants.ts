import type { SegmentId } from "./types";

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  children?: { href: string; label: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "ダッシュボード",
    icon: "LayoutDashboard",
  },
  {
    href: "/mission",
    label: "ミッション & ポートフォリオ",
    icon: "Target",
  },
  {
    href: "/segments",
    label: "事業セグメント",
    icon: "Layers",
    children: [
      { href: "/segments", label: "セグメント一覧" },
      { href: "/segments/career", label: "キャリア事業" },
      { href: "/segments/care-saas", label: "介護・障害福祉SaaS" },
      { href: "/segments/healthcare", label: "ヘルスケア" },
      { href: "/segments/international", label: "海外事業" },
    ],
  },
  {
    href: "/market",
    label: "マーケット環境",
    icon: "BarChart3",
    children: [
      { href: "/market", label: "マーケット概要" },
      { href: "/market/competitors", label: "競合分析" },
    ],
  },
  {
    href: "/sales/issue-sheet",
    label: "営業",
    icon: "Briefcase",
    children: [
      { href: "/sales/issue-sheet", label: "課題整理シート" },
      { href: "/sales/spin-script", label: "SPIN話法スクリプト" },
      { href: "/sales/the-model", label: "The Model" },
    ],
  },
  {
    href: "/saas-model",
    label: "SaaSモデル深掘り",
    icon: "Microscope",
  },
  {
    href: "/timeline",
    label: "時系列分析",
    icon: "TrendingUp",
  },
  {
    href: "/sources",
    label: "IR資料",
    icon: "FileText",
  },
];

export const SEGMENT_CONFIG: Record<SegmentId, { name: string; nameEn: string; color: string; icon: string }> = {
  career: { name: "キャリア事業", nameEn: "Career / Staffing", color: "#3B82F6", icon: "Users" },
  "care-saas": { name: "介護・障害福祉SaaS", nameEn: "Care SaaS", color: "#10B981", icon: "Monitor" },
  healthcare: { name: "ヘルスケア", nameEn: "Healthcare", color: "#F59E0B", icon: "Heart" },
  international: { name: "海外事業", nameEn: "International", color: "#8B5CF6", icon: "Globe" },
};

export const FLOW_TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  money: { label: "お金", color: "#10B981" },
  service: { label: "サービス", color: "#3B82F6" },
  information: { label: "情報", color: "#F59E0B" },
  data: { label: "データ", color: "#8B5CF6" },
  contract: { label: "契約", color: "#6B7280" },
};

export const HISTORY_CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  founding: { label: "設立", color: "#3B82F6", icon: "Building" },
  ipo: { label: "上場", color: "#10B981", icon: "TrendingUp" },
  ma: { label: "M&A", color: "#8B5CF6", icon: "GitMerge" },
  new_business: { label: "新規事業", color: "#F59E0B", icon: "Lightbulb" },
  policy: { label: "制度対応", color: "#EF4444", icon: "Scale" },
  management: { label: "経営", color: "#6366F1", icon: "Settings" },
  milestone: { label: "マイルストーン", color: "#EC4899", icon: "Award" },
  expansion: { label: "拡大", color: "#14B8A6", icon: "ArrowUpRight" },
};

export const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: "oklch(0.205 0 0)",
    border: "1px solid oklch(1 0 0 / 10%)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "oklch(0.985 0 0)",
  },
  labelStyle: { color: "oklch(0.708 0 0)" },
};
