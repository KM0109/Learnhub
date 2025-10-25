import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  lessonId: string;
  courseId: string;
  title: string;
  duration: number;
  onProgressUpdate?: (progress: number) => void;
}

const VideoPlayer = ({
  videoId,
  lessonId,
  courseId,
  title,
  duration,
  onProgressUpdate
}: VideoPlayerProps) => {
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const watchProgress = duration > 0 ? Math.min((watchedSeconds / (duration * 60)) * 100, 100) : 0;

  useEffect(() => {
    const savedProgress = localStorage.getItem(`video_progress_${courseId}_${lessonId}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setWatchedSeconds(progress.watchedSeconds || 0);
      setIsCompleted(progress.isCompleted || false);
    }
  }, [courseId, lessonId]);

  const handleVideoProgress = () => {
    const estimatedProgress = (duration * 60 * 0.5);
    setWatchedSeconds(estimatedProgress);

    const progress = {
      watchedSeconds: estimatedProgress,
      isCompleted: true,
      lastWatched: new Date().toISOString(),
    };

    localStorage.setItem(`video_progress_${courseId}_${lessonId}`, JSON.stringify(progress));
    setIsCompleted(true);

    if (onProgressUpdate) {
      onProgressUpdate(100);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            {isCompleted && (
              <Badge className="bg-success text-success-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>

          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              crossOrigin="anonymous"
              className="w-full h-full"
              onLoad={handleVideoProgress}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {formatTime(watchedSeconds)} / {formatTime(duration * 60)}
                </span>
              </div>
              <span className="font-semibold">{Math.round(watchProgress)}% watched</span>
            </div>
            <Progress value={watchProgress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
