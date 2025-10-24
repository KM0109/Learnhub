import { Card, CardContent } from "@/components/ui/card";
import { Badge as BadgeType } from "@/types/user";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface BadgeCardProps {
  badge: BadgeType;
}

const BadgeCard = ({ badge }: BadgeCardProps) => {
  const rarityColors = {
    common: "from-muted to-muted",
    rare: "from-primary/30 to-primary/50",
    epic: "from-accent/50 to-accent/70",
    legendary: "from-accent to-primary"
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all group",
      badge.earned ? "hover:shadow-elegant cursor-pointer" : "opacity-60"
    )}>
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-20",
        rarityColors[badge.rarity]
      )} />
      <CardContent className="relative p-6 text-center">
        {!badge.earned && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <div className="text-5xl mb-3">{badge.icon}</div>
        <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">{badge.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          badge.rarity === "common" && "bg-muted text-muted-foreground",
          badge.rarity === "rare" && "bg-primary/10 text-primary",
          badge.rarity === "epic" && "bg-accent/20 text-accent-foreground",
          badge.rarity === "legendary" && "bg-gradient-accent text-accent-foreground"
        )}>
          {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
        </span>
        {badge.earned && badge.earnedDate && (
          <p className="text-xs text-muted-foreground mt-2">
            Earned {new Date(badge.earnedDate).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgeCard;
