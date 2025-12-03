"use client";

import { TrendingUp, Users, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

type DashboardPageProps = {
  params: Promise<Record<string, never>>;
};

const dummyStats = {
  activeProjects: 12,
  totalTasks: 48,
  completedTasks: 32,
  pendingTasks: 16,
};

const dummyRecentActivity = [
  {
    id: "1",
    type: "task",
    message: "새 태스크가 생성되었습니다: 프로젝트 계획 수립",
    timestamp: "2시간 전",
  },
  {
    id: "2",
    type: "task",
    message: "태스크가 완료되었습니다: 디자인 리뷰",
    timestamp: "5시간 전",
  },
  {
    id: "3",
    type: "project",
    message: "새 프로젝트가 시작되었습니다: Q1 마케팅 캠페인",
    timestamp: "1일 전",
  },
  {
    id: "4",
    type: "task",
    message: "태스크가 업데이트되었습니다: 개발 환경 설정",
    timestamp: "2일 전",
  },
];

export default function DashboardPage({ params }: DashboardPageProps) {
  void params;
  const { user } = useCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-grayscale-900">
          대시보드 개요
        </h1>
        <p className="mt-1 text-sm text-grayscale-600">
          {user?.email ?? "알 수 없는 사용자"} 님, 환영합니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 프로젝트</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyStats.activeProjects}</div>
            <p className="text-xs text-grayscale-500">전월 대비 +2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 태스크</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-secondary-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyStats.totalTasks}</div>
            <p className="text-xs text-grayscale-500">이번 주</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료된 태스크</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-accent-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyStats.completedTasks}</div>
            <p className="text-xs text-grayscale-500">
              {Math.round((dummyStats.completedTasks / dummyStats.totalTasks) * 100)}% 완료율
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">대기 중인 태스크</CardTitle>
            <Clock className="h-4 w-4 text-grayscale-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyStats.pendingTasks}</div>
            <p className="text-xs text-grayscale-500">처리 필요</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyRecentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 border-b border-grayscale-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary-main" />
                  <div className="flex-1">
                    <p className="text-sm text-grayscale-900">
                      {activity.message}
                    </p>
                    <p className="mt-1 text-xs text-grayscale-500">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>프로젝트 진행률</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-grayscale-700">Q1 마케팅 캠페인</span>
                  <span className="font-medium text-grayscale-900">75%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-grayscale-200">
                  <div
                    className="h-full bg-primary-main"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-grayscale-700">웹사이트 리뉴얼</span>
                  <span className="font-medium text-grayscale-900">45%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-grayscale-200">
                  <div
                    className="h-full bg-secondary-main"
                    style={{ width: "45%" }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-grayscale-700">모바일 앱 개발</span>
                  <span className="font-medium text-grayscale-900">90%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-grayscale-200">
                  <div
                    className="h-full bg-accent-main"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
