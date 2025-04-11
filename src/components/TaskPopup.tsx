'use client'

import { useState, useEffect } from 'react';
import { Gem, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface TaskPopupProps {
  show: boolean;
  taskData: {
    type: string;
    description: string;
    targetUser: {
      name: string;
      avatar: string;
    };
    reward: number;
  };
  onAccept: () => void;
  onReject: () => void;
  onSettings: () => void;
}

export const TaskPopup = ({
  show,
  taskData,
  onAccept,
  onReject,
  onSettings
}: TaskPopupProps) => {
  const [countdown, setCountdown] = useState(10);
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    setCountdown(10);
    
    if (show) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setVisible(false);
            onReject();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [show, onReject]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 inset-x-0 mx-auto z-50 max-w-md px-4"
        >
          <div className="bg-background rounded-lg shadow-lg border p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">抢单</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={onSettings}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <button 
                  onClick={onReject}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={taskData.targetUser.avatar} />
                <AvatarFallback>{taskData.targetUser.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{taskData.description}</div>
                <div className="text-sm text-muted-foreground">
                  {taskData.targetUser.name}
                </div>
              </div>
            </div>
            
            <div className="bg-muted/40 rounded-md p-3 mb-4 flex justify-between items-center">
              <span className="text-sm">完成可获得</span>
              <span className="font-bold text-lg flex items-center text-primary">
                <Gem className="h-5 w-5 mr-1" />
                {taskData.reward}
              </span>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={onReject}
              >
                拒绝({countdown})
              </Button>
              <Button 
                className="flex-1 bg-primary animate-pulse"
                onClick={onAccept}
              >
                抢单
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 测试组件
export const TaskPopupDemo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    type: 'publicMessage',
    description: '公屏发送欢迎语给',
    targetUser: {
      name: '张三',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    reward: 40
  });

  const tasks = [
    {
      type: 'publicMessage',
      description: '公屏发送欢迎语给',
      targetUser: {
        name: '张三',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      reward: 40
    },
    {
      type: 'sendFreeGift',
      description: '赠送免费礼物给',
      targetUser: {
        name: '李四',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      reward: 200
    },
    {
      type: 'sendBubble',
      description: '赠送气泡给',
      targetUser: {
        name: '王五',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
      reward: 200
    }
  ];

  const handleShowPopup = (task: any) => {
    setCurrentTask(task);
    setShowPopup(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">抢单弹窗测试</h2>
      <div className="flex flex-wrap gap-2">
        {tasks.map((task, index) => (
          <button
            key={index}
            onClick={() => handleShowPopup(task)}
            className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-md text-sm"
          >
            模拟 {task.description} 抢单
          </button>
        ))}
      </div>
      
      <TaskPopup
        show={showPopup}
        taskData={currentTask}
        onAccept={() => {
          alert('抢单成功！');
          setShowPopup(false);
        }}
        onReject={() => setShowPopup(false)}
        onSettings={() => alert('打开设置')}
      />
    </div>
  );
}; 