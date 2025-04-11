'use client'

import { useState, useEffect } from 'react';
import { Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskNotificationProps {
  show: boolean;
  reward: number;
  taskType: string;
  onClose: () => void;
}

export const TaskNotification = ({ 
  show, 
  reward, 
  taskType, 
  onClose 
}: TaskNotificationProps) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-primary/20 max-w-xs">
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-primary">完成任务</h3>
              <div className="flex items-center mt-1">
                <span className="text-lg font-bold flex items-center">
                  +{reward}
                  <Gem className="h-4 w-4 ml-1 text-primary" />
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{taskType}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 这个组件用于测试通知
export const TaskNotificationDemo = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    reward: 0,
    taskType: ''
  });

  const triggerNotification = (reward: number, taskType: string) => {
    setNotificationData({ reward, taskType });
    setShowNotification(true);
  };

  const tasks = [
    { reward: 40, type: '公屏发送欢迎语给新用户' },
    { reward: 200, type: '赠送免费礼物给新用户' },
    { reward: 200, type: '赠送气泡给新用户' },
    { reward: 200, type: '赠送头像框给新用户' },
    { reward: 100, type: '房间开播10分钟以上' }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">任务通知测试</h2>
      <div className="flex flex-wrap gap-2">
        {tasks.map((task, index) => (
          <button
            key={index}
            onClick={() => triggerNotification(task.reward, task.type)}
            className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-md text-sm"
          >
            模拟 {task.type}
          </button>
        ))}
      </div>
      
      <TaskNotification
        show={showNotification}
        reward={notificationData.reward}
        taskType={notificationData.taskType}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}; 