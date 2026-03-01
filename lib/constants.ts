import type { SegmentId } from "./types";

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  section?: string;
  children?: { href: string; label: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  // --- ホーム ---
  {
    href: "/",
    label: "ホーム",
    icon: "LayoutDashboard",
  },

  // --- SaaSを学ぶ ---
  {
    href: "/saas-model",
    label: "SaaSとは",
    icon: "Microscope",
    section: "SaaSを学ぶ",
  },
  {
    href: "/org",
    label: "組織・実行",
    icon: "Cog",
    section: "SaaSを学ぶ",
    children: [
      { href: "/org", label: "組織全体マップ" },
      { href: "/org/sm", label: "S&M（営業）" },
      { href: "/org/rd", label: "R&D（開発）" },
      { href: "/org/ga", label: "G&A（管理）" },
      { href: "/sales/the-model", label: "The Model（ファネル）" },
    ],
  },
  {
    href: "/sales/spin-script",
    label: "セールス実践",
    icon: "Briefcase",
    section: "SaaSを学ぶ",
    children: [
      { href: "/sales/spin-script", label: "IS架電 / SPIN商談" },
      { href: "/sales/is-script", label: "ISスクリプト詳細" },
      { href: "/sales/issue-sheet", label: "課題整理シート" },
      { href: "/sales/glossary", label: "マーケティング用語集" },
    ],
  },

  // --- SMS実例 ---
  {
    href: "/timeline",
    label: "財務推移",
    icon: "TrendingUp",
    section: "SMS実例",
  },
  {
    href: "/segments",
    label: "セグメント分析",
    icon: "Layers",
    section: "SMS実例",
  },
  {
    href: "/market",
    label: "市場環境",
    icon: "BarChart3",
    section: "SMS実例",
  },
  {
    href: "/mission",
    label: "会社・ミッション",
    icon: "FileText",
    section: "SMS実例",
  },

  // --- リファレンス ---
  {
    href: "/case-studies",
    label: "ケーススタディ",
    icon: "Building2",
    section: "リファレンス",
  },
  {
    href: "/ai-saas",
    label: "AI × SaaS",
    icon: "Brain",
    section: "リファレンス",
  },
  {
    href: "/glossary",
    label: "SaaS用語集",
    icon: "BookOpen",
    section: "リファレンス",
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
