import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Milestone } from "@/types/user";
import { CheckCircle, Trophy } from "lucide-react";

interface MilestoneCardProps {
  milestone: Milestone;
}

const MilestoneCard = ({ milestone }: MilestoneCardProps) => {
  const progressPercentage = (milestone.progress / milestone.target) * 100;

  return (
    <Card className="transition-all hover:shadow-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{milestone.title}</h3>
              {milestone.completed && (
                <CheckCircle className="h-5 w-5 text-success shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{milestone.description}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">
                {milestone.progress} / {milestone.target}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              {milestone.reward}
            </Badge>
            {!milestone.completed && (
              <span className="text-xs text-muted-foreground">
                {milestone.target - milestone.progress} more to go
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneCard;
