'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star } from "lucide-react";
import { BottomNavigation } from "./BottomNavigation";

export const ProfilePage = () => {
  const userStats = [
    {
      title: "游戏时长",
      value: "120小时",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      title: "获得成就",
      value: "32个",
      icon: <Star className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      <div className="container py-6">
        <div className="flex flex-col items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="text-2xl font-bold">陈明</h1>
            <p className="text-muted-foreground">游戏爱好者</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 w-full max-w-3xl">
            {userStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="w-full max-w-3xl space-y-4">
            <h2 className="text-xl font-semibold">最近游戏</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <h3 className="font-medium">艾尔登法环</h3>
                  <p className="text-sm text-muted-foreground">上次游玩：2小时前</p>
                </div>
                <Button variant="outline" size="sm">
                  启动
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <h3 className="font-medium">英雄联盟</h3>
                  <p className="text-sm text-muted-foreground">上次游玩：昨天</p>
                </div>
                <Button variant="outline" size="sm">
                  启动
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}; 