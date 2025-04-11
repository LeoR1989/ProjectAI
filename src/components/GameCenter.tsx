import { BottomNavigation } from "./BottomNavigation";

export const GameCenter = () => {
  const games = [
    {
      id: "1",
      title: "荒野大镖客：救赎2",
      image: "https://source.unsplash.com/400x300/?western",
      category: "动作冒险",
      players: 1,
    },
    {
      id: "2",
      title: "艾尔登法环",
      image: "https://source.unsplash.com/400x300/?fantasy",
      category: "动作角色",
      players: 1,
    },
    {
      id: "3",
      title: "英雄联盟",
      image: "https://source.unsplash.com/400x300/?moba",
      category: "多人竞技",
      players: 5,
    },
    {
      id: "4",
      title: "我的世界",
      image: "https://source.unsplash.com/400x300/?minecraft",
      category: "沙盒",
      players: 1,
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">游戏中心</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <div key={game.id} className="game-card">
              <img
                src={game.image}
                alt={game.title}
                className="game-card-image"
              />
              <div className="game-card-content">
                <h3 className="font-semibold">{game.title}</h3>
                <p className="text-sm opacity-90">{game.category}</p>
                <p className="text-sm opacity-90">
                  {game.players} {game.players > 1 ? "players" : "player"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}; 