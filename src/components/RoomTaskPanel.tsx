'use client'

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Gem, RefreshCw } from 'lucide-react';

// 模拟数据 - 房间任务
const roomTasks = [
  {
    id: '1',
    type: 'publicMessage',
    description: '公屏发送欢迎语给',
    targetUser: {
      name: '李明',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      isNew: true
    },
    reward: 40,
  },
  {
    id: '2',
    type: 'sendFreeGift',
    description: '赠送免费礼物给',
    targetUser: {
      name: '王浩',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      isNew: true
    },
    reward: 200,
  },
  {
    id: '3',
    type: 'sendBubble',
    description: '赠送气泡给',
    targetUser: {
      name: '赵强',
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
      isNew: true
    },
    reward: 200,
  },
];

export const RoomTaskPanel = () => {
  const [grabbedTask, setGrabbedTask] = useState<string | null>(null);

  const handleGrabTask = (taskId: string) => {
    setGrabbedTask(taskId);
    // 这里应该有更多逻辑来处理抢单行为
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">房间抢单</h2>
        <Button variant="ghost" size="sm" className="text-sm">
          <RefreshCw className="h-4 w-4 mr-1" />
          刷新
        </Button>
      </div>

      {roomTasks.length > 0 ? (
        <div className="space-y-3">
          {roomTasks.map((task) => (
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
              {grabbedTask === task.id ? (
                <Button size="sm" variant="secondary" className="flex-shrink-0">
                  去完成
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  className="flex-shrink-0"
                  onClick={() => handleGrabTask(task.id)}
                >
                  抢单
                </Button>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">
            当前房间暂无可抢任务，请稍后再试。
          </p>
        </div>
      )}
      
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm">
          查看抢单大厅
        </Button>
      </div>
    </div>
  );
}; 