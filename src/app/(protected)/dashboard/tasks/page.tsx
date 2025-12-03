"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DashboardTasksPageProps = {
  params: Promise<Record<string, never>>;
};

type TaskStatus = "todo" | "in-progress" | "done";

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
};

const dummyTasks: Task[] = [
  {
    id: "1",
    title: "프로젝트 계획 수립",
    description: "Q1 마케팅 캠페인을 위한 초기 계획 수립",
    status: "in-progress",
    assignee: "김철수",
    dueDate: "2025-12-10",
    priority: "high",
  },
  {
    id: "2",
    title: "디자인 리뷰",
    description: "웹사이트 리뉴얼 디자인 최종 리뷰",
    status: "done",
    assignee: "이영희",
    dueDate: "2025-12-05",
    priority: "medium",
  },
  {
    id: "3",
    title: "개발 환경 설정",
    description: "새 프로젝트를 위한 개발 환경 구성",
    status: "todo",
    assignee: "박민수",
    dueDate: "2025-12-15",
    priority: "high",
  },
  {
    id: "4",
    title: "API 문서 작성",
    description: "백엔드 API 엔드포인트 문서화",
    status: "in-progress",
    assignee: "최지영",
    dueDate: "2025-12-12",
    priority: "medium",
  },
  {
    id: "5",
    title: "테스트 케이스 작성",
    description: "주요 기능에 대한 단위 테스트 작성",
    status: "todo",
    assignee: "정대현",
    dueDate: "2025-12-20",
    priority: "low",
  },
];

const statusLabels: Record<TaskStatus, string> = {
  todo: "할 일",
  "in-progress": "진행 중",
  done: "완료",
};

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

export default function DashboardTasksPage({
  params,
}: DashboardTasksPageProps) {
  void params;
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTasks = dummyTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-grayscale-900">태스크</h1>
          <p className="mt-1 text-sm text-grayscale-600">
            프로젝트 태스크를 관리하고 추적하세요
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          새 태스크
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>태스크 목록</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grayscale-400" />
                <Input
                  placeholder="태스크 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="todo">할 일</SelectItem>
                  <SelectItem value="in-progress">진행 중</SelectItem>
                  <SelectItem value="done">완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="py-12 text-center text-sm text-grayscale-500">
                검색 결과가 없습니다.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border border-grayscale-200 p-4 transition-colors hover:bg-grayscale-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-grayscale-900">
                          {task.title}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[task.priority]}`}
                        >
                          {task.priority === "high"
                            ? "높음"
                            : task.priority === "medium"
                              ? "보통"
                              : "낮음"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-grayscale-600">
                        {task.description}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-grayscale-500">
                        <span>담당자: {task.assignee}</span>
                        <span>마감일: {task.dueDate}</span>
                        <span className="rounded-full bg-grayscale-100 px-2 py-0.5">
                          {statusLabels[task.status]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

