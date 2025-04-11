'use client'

import React, { useState } from 'react';
import { 
  Bell, 
  ChevronRight, 
  Gem, 
  Gift, 
  MessageCircle, 
  RefreshCw, 
  Users 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

// 模拟数据 - 抢单任务
const grabTasks = [
  {
    id: '1',
    type: 'publicMessage',
    description: '公屏发送欢迎语给',
    targetUser: {
      name: '张三',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      isNew: true
    },
    reward: 40,
    timestamp: new Date().getTime() - 60000 * 5
  },
  {
    id: '2',
    type: 'sendFreeGift',
    description: '赠送免费礼物给',
    targetUser: {
      name: '李四',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      isNew: true
    },
    reward: 200,
    timestamp: new Date().getTime() - 60000 * 10
  },
  {
    id: '3',
    type: 'sendBubble',
    description: '赠送气泡给',
    targetUser: {
      name: '王五',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      isNew: true
    },
    reward: 200,
    timestamp: new Date().getTime() - 60000 * 15
  },
];

// 模拟数据 - 阶梯任务
const ladderTasks = [
  {
    id: '1',
    type: 'receiveFreeGift',
    description: '收到指定礼物',
    rewardPerTime: 300,
    completedTimes: 3,
    thresholds: [2, 5, 10],
    bonusRewards: [500, 1000, 2000],
    resetTime: new Date().getTime() + 60000 * 60 * 24 * 3 // 3天后重置
  },
  {
    id: '2',
    type: 'receiveAnyGift',
    description: '收到[新男标签]的任意礼物',
    rewardPerTime: 100,
    completedTimes: 5,
    thresholds: [5, 10, 20],
    bonusRewards: [300, 800, 1500],
    resetTime: new Date().getTime() + 60000 * 60 * 24 * 3 // 3天后重置
  }
];

// 模拟数据 - 一次性任务
const oneTimeTasks = [
  {
    id: '1',
    type: 'openMessageAutoReply',
    description: '打开消息代发功能',
    rule: '打开后，系统会自动帮你向男生打招呼，你可以获得更多水晶。',
    reward: 500,
    completed: false
  }
];

export const TaskCenter = () => {
  const [activeTab, setActiveTab] = useState('allTasks');
  const estimatedCrystals = Math.floor(Math.random() * 17000) + 3000;
  const todayEarned = 1200;

  const formatTime = (timestamp: number) => {
    const days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timestamp % (1000 * 60)) / 1000);
    
    return `${days}天${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getRemainingTime = (resetTime: number) => {
    const now = new Date().getTime();
    const remaining = resetTime - now;
    return remaining > 0 ? formatTime(remaining) : '0天00:00:00';
  };

  const getLadderProgress = (completed: number, thresholds: number[]) => {
    const maxThreshold = thresholds[thresholds.length - 1];
    return (completed / maxThreshold) * 100;
  };

  return (
    <div className="container py-6 pb-16">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">任务大厅</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">累计获得: </span>
          <span className="font-semibold flex items-center text-primary">
            <Gem className="h-4 w-4 mr-1" />
            {todayEarned}
          </span>
        </div>
      </div>

      <div className="bg-primary/10 rounded-lg p-4 mb-6 flex justify-between items-center">
        <div>
          <span className="block text-sm mb-1">当前有大量可做任务</span>
          <span className="font-bold text-xl flex items-center">
            预计可以获得 <Gem className="h-5 w-5 mx-1 text-primary" />
            <span className="text-primary">{estimatedCrystals}</span>
          </span>
        </div>
        <Button variant="default" size="sm">
          查看规则
        </Button>
      </div>

      <Tabs defaultValue="allTasks" className="mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="allTasks" onClick={() => setActiveTab('allTasks')}>
            全部任务
          </TabsTrigger>
          <TabsTrigger value="taskRecords" onClick={() => setActiveTab('taskRecords')}>
            任务记录
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="allTasks" className="space-y-6">
          {/* 抢单任务 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">抢单任务</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    规则
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>抢单任务</DialogTitle>
                    <DialogDescription>
                      <p className="mb-2">1. 任务触发条件</p>
                      <p className="text-sm text-muted-foreground mb-4">当有可完成的任务且你符合参与资格时（如在线、未拉黑、未完成过该任务等），系统会在任务池中展示抢单入口。</p>
                      
                      <p className="mb-2">2. 参与方式</p>
                      <p className="text-sm text-muted-foreground mb-4">免费操作：无需消耗任何资源，点击「抢单」按钮即可加入。<br/>快速响应：任务可能被多人同时争抢，需第一时间完成指定操作（如发公屏消息、送礼物等），否则会被其他主播抢先。</p>
                      
                      <p className="mb-2">3. 奖励结算</p>
                      <p className="text-sm text-muted-foreground">完成任务后立即获得对应水晶奖励，可直接用于结算。<br/>若多人抢单，仅最先完成操作的主播获得奖励。</p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            
            {grabTasks.length > 0 ? (
              <div className="space-y-3">
                {grabTasks.map((task) => (
                  <Card key={task.id} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={task.targetUser.avatar} />
                          <AvatarFallback>{task.targetUser.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{task.description}</span>
                          <span className="font-medium ml-1">{task.targetUser.name}</span>
                          {task.targetUser.isNew && (
                            <Badge variant="outline" className="ml-1 bg-primary/20 text-primary text-xs px-1 py-0">NEW</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          完成可获得 <Gem className="inline h-3 w-3 text-primary" /> <span className="text-primary font-medium">{task.reward}</span> 水晶
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="flex-shrink-0">
                      抢单
                    </Button>
                  </Card>
                ))}
                <Button variant="outline" className="w-full">
                  更多抢单
                </Button>
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  当前暂无抢单任务，与携带[新男标签]用户保持联系，收到他们的礼物，可以获得更多水晶！
                </p>
                <Button variant="outline" size="sm">
                  查看规则
                </Button>
              </div>
            )}
          </div>

          {/* 阶梯任务 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">阶梯任务</h2>
              <span className="text-sm text-muted-foreground">
                {getRemainingTime(ladderTasks[0].resetTime)}后更新
              </span>
            </div>
            
            <div className="space-y-4">
              {ladderTasks.map((task) => (
                <Card key={task.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{task.description}</h3>
                      <p className="text-sm text-muted-foreground">
                        每次+<Gem className="inline h-3 w-3 text-primary" /> <span className="text-primary font-medium">{task.rewardPerTime}</span> 水晶
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-muted">
                      已完成 {task.completedTimes}次
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <Progress value={getLadderProgress(task.completedTimes, task.thresholds)} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      {task.thresholds.map((threshold, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <span>{threshold}</span>
                          <span className="text-primary">+{task.bonusRewards[index]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 一次性任务 */}
          {oneTimeTasks.some(task => !task.completed) && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">一次性任务</h2>
              
              <div className="space-y-3">
                {oneTimeTasks.filter(task => !task.completed).map((task) => (
                  <Card key={task.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{task.description}</h3>
                        <p className="text-sm text-muted-foreground">
                          {task.rule}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="mb-1">
                          <Gem className="inline h-3 w-3 text-primary" /> <span className="text-primary font-medium">{task.reward}</span> 水晶
                        </div>
                        <Button size="sm">去完成</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="taskRecords">
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-center">
              任务按照UTC+0自然月的完成次数进行统计
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              { type: '公屏发送欢迎语', reward: 40, completed: 12, total: 480 },
              { type: '赠送免费礼物', reward: 200, completed: 8, total: 1600 },
              { type: '赠送气泡', reward: 200, completed: 3, total: 600 },
              { type: '赠送头像框', reward: 200, completed: 5, total: 1000 },
              { type: '房间开播10分钟以上', reward: 100, completed: 6, total: 600 },
            ].map((record, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{record.type}</h3>
                    <p className="text-sm text-muted-foreground">
                      每次+<Gem className="inline h-3 w-3 text-primary" /> <span className="text-primary font-medium">{record.reward}</span> 水晶
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      已完成 <span className="font-medium">{record.completed}</span>次
                    </div>
                    <div className="text-sm text-muted-foreground">
                      累计获得 <Gem className="inline h-3 w-3 text-primary" /> <span className="text-primary font-medium">{record.total}</span> 水晶
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 