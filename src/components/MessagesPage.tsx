'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "./BottomNavigation";

export const MessagesPage = () => {
  const messages = [
    {
      id: "1",
      sender: {
        name: "张三",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        initials: "张",
      },
      content: "你好，最近在玩什么游戏？",
      time: "10:30",
      unread: true,
    },
    {
      id: "2",
      sender: {
        name: "李四",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        initials: "李",
      },
      content: "要不要一起组队？",
      time: "09:15",
      unread: false,
    },
    {
      id: "3",
      sender: {
        name: "王五",
        initials: "王",
      },
      content: "新游戏很好玩，推荐你试试！",
      time: "昨天",
      unread: true,
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">消息</h1>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src={message.sender.avatar} />
                  <AvatarFallback>{message.sender.initials}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.sender.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {message.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {message.content}
                </p>
              </div>
              {message.unread && (
                <div className="flex-shrink-0">
                  <Badge variant="default">新</Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}; 