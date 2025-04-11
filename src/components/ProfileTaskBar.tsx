'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gem, Gift, MessageCircle, Award, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Task {
  id: string;
  type: 'publicMessage' | 'sendFreeGift' | 'sendBubble' | 'sendAvatar' | 'receiveSpecificGift' | 'receiveAnyGift';
  active: boolean;
  completed: boolean;
  reward: number;
  icon: React.ReactNode;
  label: string;
}

export const ProfileTaskBar = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      type: 'publicMessage',
      active: true,
      completed: false,
      reward: 40,
      icon: <MessageCircle className="h-5 w-5" />,
      label: '公屏消息'
    },
    {
      id: '2',
      type: 'sendFreeGift',
      active: true,
      completed: false,
      reward: 200,
      icon: <Gift className="h-5 w-5" />,
      label: '免费礼物'
    },
    {
      id: '3',
      type: 'sendBubble',
      active: false,
      completed: false,
      reward: 200,
      icon: <Award className="h-5 w-5" />,
      label: '气泡'
    },
    {
      id: '4',
      type: 'sendAvatar',
      active: false,
      completed: false,
      reward: 200,
      icon: <Award className="h-5 w-5" />,
      label: '头像框'
    },
  ]);

  const handleTaskClick = (taskId: string) => {
    if (tasks.find(t => t.id === taskId)?.active) {
      // 处理任务点击逻辑
      console.log(`执行任务: ${taskId}`);
      
      // 模拟完成任务
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      ));
    } else {
      // 如果任务未激活，显示提示
      alert('请先完成已点亮任务～');
    }
  };

  const activeTasks = tasks.filter(task => task.active);
  const completedTasks = tasks.filter(task => task.completed);
  
  // 如果所有任务都完成了，返回null
  if (completedTasks.length === tasks.length) {
    return null;
  }

  return (
    <div className="bg-background/60 backdrop-blur-sm p-3 rounded-lg shadow-sm border">
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">免费送出</span>
          <div className="flex items-center gap-3">
            {tasks.map((task) => (
              <Tooltip key={task.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleTaskClick(task.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                      task.completed 
                        ? 'opacity-50 cursor-not-allowed' 
                        : task.active 
                          ? 'bg-primary/10 hover:bg-primary/20' 
                          : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={task.completed}
                  >
                    <div className={`p-1 rounded-full ${task.active ? 'text-primary' : 'text-muted-foreground'}`}>
                      {task.icon}
                    </div>
                    <div className="flex items-center text-xs">
                      <Gem className="h-3 w-3 mr-0.5 text-primary" />
                      <span className={task.active ? 'text-primary font-medium' : 'text-muted-foreground'}>
                        {task.reward}
                      </span>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{task.label}</p>
                  {task.completed && <p className="text-xs text-muted-foreground">已完成</p>}
                  {!task.active && !task.completed && <p className="text-xs text-muted-foreground">请先完成已点亮任务</p>}
                </TooltipContent>
              </Tooltip>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex flex-col items-center p-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>完成这些任务可以获得水晶奖励</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}; 