import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}兆`;
  }
  if (value >= 100) {
    return `${(value / 10).toFixed(0)}億`;
  }
  return `${value}百万`;
}

export function formatRevenue(value: number): string {
  if (value >= 100000) {
    return `${(value / 1000).toFixed(0)}億`;
  }
  if (value >= 10000) {
    return `${(value / 1000).toFixed(1)}億`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}億`;
  }
  return `${value.toLocaleString()}百万`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("ja-JP");
}

export function formatYearMonth(year: number, month?: number): string {
  if (month) {
    return `${year}年${month}月`;
  }
  return `${year}年`;
}

export function calcYoY(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}
