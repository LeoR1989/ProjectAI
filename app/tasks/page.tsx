import { TaskCenter } from "@/components/TaskCenter";
import { BottomNavigation } from "@/components/BottomNavigation";

export default function TasksPage() {
  return (
    <div className="min-h-screen pb-16">
      <TaskCenter />
      <BottomNavigation />
    </div>
  );
} 