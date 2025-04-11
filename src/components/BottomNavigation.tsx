'use client'

import { Home, Gamepad2, MessageCircle, User, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const BottomNavigation = () => {
  const pathname = usePathname();
  const tabs = [
    { id: "/", icon: <Home className="h-5 w-5" />, label: "首页" },
    { id: "/games", icon: <Gamepad2 className="h-5 w-5" />, label: "游戏" },
    { id: "/tasks", icon: <Trophy className="h-5 w-5" />, label: "任务" },
    { id: "/messages", icon: <MessageCircle className="h-5 w-5" />, label: "消息" },
    { id: "/profile", icon: <User className="h-5 w-5" />, label: "我的" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={`flex flex-col h-full w-full rounded-none ${
              pathname === tab.id ? "text-primary" : ""
            }`}
            asChild
          >
            <Link href={tab.id}>
              {tab.icon}
              <span className="text-xs mt-1">{tab.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}; 