"use client";

import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DashboardReportsPageProps = {
  params: Promise<Record<string, never>>;
};

const dummyReportData = {
  projectPerformance: [
    { project: "Q1 마케팅 캠페인", completion: 75, target: 100 },
    { project: "웹사이트 리뉴얼", completion: 45, target: 100 },
    { project: "모바일 앱 개발", completion: 90, target: 100 },
  ],
  teamProductivity: {
    thisMonth: 85,
    lastMonth: 72,
    change: 13,
  },
  taskDistribution: {
    completed: 32,
    inProgress: 16,
    pending: 8,
  },
  recentMilestones: [
    {
      id: "1",
      title: "Q1 마케팅 캠페인 1단계 완료",
      date: "2025-12-01",
      status: "completed",
    },
    {
      id: "2",
      title: "웹사이트 리뉴얼 디자인 승인",
      date: "2025-11-28",
      status: "completed",
    },
    {
      id: "3",
      title: "모바일 앱 베타 테스트 시작",
      date: "2025-12-05",
      status: "upcoming",
    },
  ],
};

export default function DashboardReportsPage({
  params,
}: DashboardReportsPageProps) {
  void params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-grayscale-900">리포트</h1>
          <p className="mt-1 text-sm text-grayscale-600">
            프로젝트 성과와 팀 생산성을 분석하세요
          </p>
        </div>
        <Select defaultValue="this-month">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="기간 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">이번 주</SelectItem>
            <SelectItem value="this-month">이번 달</SelectItem>
            <SelectItem value="this-quarter">이번 분기</SelectItem>
            <SelectItem value="this-year">올해</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">팀 생산성</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyReportData.teamProductivity.thisMonth}%
            </div>
            <p className="text-xs text-grayscale-500">
              전월 대비 +{dummyReportData.teamProductivity.change}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료된 태스크</CardTitle>
            <BarChart3 className="h-4 w-4 text-secondary-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyReportData.taskDistribution.completed}
            </div>
            <p className="text-xs text-grayscale-500">
              진행 중: {dummyReportData.taskDistribution.inProgress} | 대기:{" "}
              {dummyReportData.taskDistribution.pending}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 프로젝트</CardTitle>
            <Users className="h-4 w-4 text-accent-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyReportData.projectPerformance.length}
            </div>
            <p className="text-xs text-grayscale-500">진행 중인 프로젝트</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>프로젝트 성과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyReportData.projectPerformance.map((item) => (
                <div key={item.project}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-grayscale-700">{item.project}</span>
                    <span className="font-medium text-grayscale-900">
                      {item.completion}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-grayscale-200">
                    <div
                      className="h-full bg-primary-main"
                      style={{ width: `${item.completion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>최근 마일스톤</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyReportData.recentMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-start gap-3 border-b border-grayscale-100 pb-4 last:border-0 last:pb-0"
                >
                  <Calendar className="mt-0.5 h-4 w-4 text-grayscale-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-grayscale-900">
                      {milestone.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-xs text-grayscale-500">
                        {milestone.date}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          milestone.status === "completed"
                            ? "bg-accent-main/20 text-accent-main"
                            : "bg-primary-main/20 text-primary-main"
                        }`}
                      >
                        {milestone.status === "completed" ? "완료" : "예정"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

