"use client"

import React, { useState } from "react";
import { 
  Home, 
  Gamepad2, 
  MessageCircle, 
  User, 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  LogOut,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TabItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface GameItem {
  id: string;
  title: string;
  image: string;
  category: string;
  players: number;
}

interface MessageItem {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  time: string;
  unread: boolean;
}

const BottomNavigation = () => {
  const pathname = usePathname();
  const tabs = [
    { id: "/", icon: <Home className="h-5 w-5" />, label: "首页" },
    { id: "/games", icon: <Gamepad2 className="h-5 w-5" />, label: "游戏" },
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

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>菜单</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    首页
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/games">
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    游戏中心
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/messages">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    消息
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    个人资料
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/tasks">
                    <Trophy className="mr-2 h-4 w-4" />
                    任务中心
                  </Link>
                </Button>
                <Separator />
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    设置
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    退出登录
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Gamepad2 className="h-5 w-5" />
            <span className="hidden md:inline-block">游戏平台</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground ${
                    pathname === "/" ? "text-primary" : "text-muted-foreground"
                  }`}
                  href="/"
                >
                  首页
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>游戏中心</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink
                        className="flex select-none flex-col gap-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                        href="/games/action"
                      >
                        <div className="text-sm font-medium">动作游戏</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          刺激的动作游戏，包括射击、格斗等类型
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        className="flex select-none flex-col gap-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                        href="/games/rpg"
                      >
                        <div className="text-sm font-medium">角色扮演</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          沉浸式的角色扮演游戏，体验不同的世界和故事
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        className="flex select-none flex-col gap-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                        href="/games/strategy"
                      >
                        <div className="text-sm font-medium">策略游戏</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          需要思考和规划的策略游戏，挑战你的智慧
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        className="flex select-none flex-col gap-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                        href="/games/casual"
                      >
                        <div className="text-sm font-medium">休闲游戏</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          轻松有趣的休闲游戏，适合随时随地玩
                        </p>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground ${
                    pathname === "/messages" ? "text-primary" : "text-muted-foreground"
                  }`}
                  href="/messages"
                >
                  消息
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground ${
                    pathname === "/tasks" ? "text-primary" : "text-muted-foreground"
                  }`}
                  href="/tasks"
                >
                  任务
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:flex w-40 lg:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索..." className="pl-8" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">通知</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">搜索</span>
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

const GameCenter = () => {
  const games: GameItem[] = [
    {
      id: "1",
      title: "星际战争",
      image: "https://source.unsplash.com/random/300x200?space",
      category: "动作",
      players: 1250,
    },
    {
      id: "2",
      title: "魔法王国",
      image: "https://source.unsplash.com/random/300x200?magic",
      category: "角色扮演",
      players: 3420,
    },
    {
      id: "3",
      title: "城市建设者",
      image: "https://source.unsplash.com/random/300x200?city",
      category: "策略",
      players: 890,
    },
    {
      id: "4",
      title: "水果消消乐",
      image: "https://source.unsplash.com/random/300x200?fruit",
      category: "休闲",
      players: 5670,
    },
    {
      id: "5",
      title: "赛车大师",
      image: "https://source.unsplash.com/random/300x200?racing",
      category: "竞速",
      players: 2340,
    },
    {
      id: "6",
      title: "宝藏猎人",
      image: "https://source.unsplash.com/random/300x200?treasure",
      category: "冒险",
      players: 1780,
    },
  ];

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">游戏中心</h2>
        <Button variant="outline">查看全部</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <Card key={game.id} className="overflow-hidden">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-40 object-cover"
            />
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <CardDescription>
                    {game.category} · {game.players.toLocaleString()} 玩家
                  </CardDescription>
                </div>
                <Button size="sm">开始</Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

const MessagesPage = () => {
  const messages: MessageItem[] = [
    {
      id: "1",
      sender: {
        name: "张三",
        avatar: "https://source.unsplash.com/random/100x100?portrait=1",
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
        avatar: "https://source.unsplash.com/random/100x100?portrait=2",
        initials: "李",
      },
      content: "我们今晚一起组队吧！",
      time: "昨天",
      unread: true,
    },
    {
      id: "3",
      sender: {
        name: "王五",
        avatar: "https://source.unsplash.com/random/100x100?portrait=3",
        initials: "王",
      },
      content: "新游戏已经发布，快来看看！",
      time: "昨天",
      unread: false,
    },
    {
      id: "4",
      sender: {
        name: "赵六",
        avatar: "https://source.unsplash.com/random/100x100?portrait=4",
        initials: "赵",
      },
      content: "恭喜你获得了游戏大奖！",
      time: "周一",
      unread: false,
    },
    {
      id: "5",
      sender: {
        name: "游戏助手",
        avatar: "https://source.unsplash.com/random/100x100?robot",
        initials: "助",
      },
      content: "您有新的游戏邀请，请查收。",
      time: "周日",
      unread: false,
    },
  ];

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">消息</h2>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted cursor-pointer"
          >
            <Avatar className="h-12 w-12">
              {message.sender.avatar && (
                <AvatarImage src={message.sender.avatar} />
              )}
              <AvatarFallback>{message.sender.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{message.sender.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {message.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {message.content}
              </p>
            </div>
            {message.unread && (
              <Badge className="h-2 w-2 rounded-full p-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="container py-6">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">用户名</h2>
        <p className="text-muted-foreground">ID: 12345678</p>
      </div>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stats">统计</TabsTrigger>
          <TabsTrigger value="achievements">成就</TabsTrigger>
          <TabsTrigger value="friends">好友</TabsTrigger>
        </TabsList>
        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>游戏统计</CardTitle>
              <CardDescription>查看您的游戏数据和进度</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">总游戏时间</span>
                  <span className="text-2xl font-bold">120小时</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">游戏数量</span>
                  <span className="text-2xl font-bold">24</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">最高分数</span>
                  <span className="text-2xl font-bold">9,850</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">排名</span>
                  <span className="text-2xl font-bold">#128</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>成就</CardTitle>
              <CardDescription>您已解锁的游戏成就</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">初级玩家</h4>
                    <p className="text-sm text-muted-foreground">完成10场游戏</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">高分达人</h4>
                    <p className="text-sm text-muted-foreground">单场得分超过5000分</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="friends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>好友列表</CardTitle>
              <CardDescription>您的游戏好友</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://source.unsplash.com/random/100x100?portrait=1" />
                      <AvatarFallback>张</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">张三</h4>
                      <p className="text-xs text-muted-foreground">在线</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">邀请</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://source.unsplash.com/random/100x100?portrait=2" />
                      <AvatarFallback>李</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">李四</h4>
                      <p className="text-xs text-muted-foreground">离线</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">邀请</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Star = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const MainApp = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
        <div id="home" className={activeTab === "home" ? "block" : "hidden"}>
          <div className="container py-6">
            <h1 className="text-3xl font-bold mb-6">欢迎回来</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>推荐游戏</CardTitle>
                  <CardDescription>根据您的喜好推荐</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://source.unsplash.com/random/100x100?game=1"
                        alt="游戏"
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">星际战争</h3>
                        <p className="text-sm text-muted-foreground">动作 · 1250 玩家</p>
                      </div>
                      <Button size="sm">玩</Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src="https://source.unsplash.com/random/100x100?game=2"
                        alt="游戏"
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">魔法王国</h3>
                        <p className="text-sm text-muted-foreground">角色扮演 · 3420 玩家</p>
                      </div>
                      <Button size="sm">玩</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>最近活动</CardTitle>
                  <CardDescription>您最近的游戏活动</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center">
                        <Trophy className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">获得成就</h3>
                        <p className="text-sm text-muted-foreground">在"星际战争"中获得"初级玩家"成就</p>
                        <p className="text-xs text-muted-foreground">2小时前</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center">
                        <Gamepad2 className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">游戏记录</h3>
                        <p className="text-sm text-muted-foreground">在"魔法王国"中游戏了45分钟</p>
                        <p className="text-xs text-muted-foreground">昨天</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div id="games" className={activeTab === "games" ? "block" : "hidden"}>
          <GameCenter />
        </div>
        <div id="messages" className={activeTab === "messages" ? "block" : "hidden"}>
          <MessagesPage />
        </div>
        <div id="profile" className={activeTab === "profile" ? "block" : "hidden"}>
          <ProfilePage />
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MainApp; 