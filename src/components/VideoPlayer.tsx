import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface VideoPlayerProps {
  videoId: string;
  lessonId: string;
  courseId: string;
  title: string;
  duration: number;
  onProgressUpdate?: (progress: number, lessonId: string) => void;
  onVideoComplete?: (lessonId: string) => void;
}

const VideoPlayer = ({
  videoId,
  lessonId,
  courseId,
  title,
  duration,
  onProgressUpdate,
  onVideoComplete
}: VideoPlayerProps) => {
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const watchProgress = duration > 0 ? Math.min((watchedSeconds / (duration * 60)) * 100, 100) : 0;

  useEffect(() => {
    const savedProgress = localStorage.getItem(`video_progress_${courseId}_${lessonId}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      const seconds = progress.watchedSeconds || 0;
      setWatchedSeconds(seconds);

      const currentProgress = (seconds / (duration * 60)) * 100;
      const completed = progress.isCompleted || currentProgress >= 90;
      setIsCompleted(completed);
    }
  }, [courseId, lessonId, duration]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (playerRef.current && window.YT && window.YT.Player) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          videoId: videoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            controls: 1,
          },
          events: {
            onStateChange: handlePlayerStateChange,
          },
        });
        setPlayer(newPlayer);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  const handlePlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      startProgressTracking();
    } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      if (event.data === window.YT.PlayerState.ENDED) {
        handleVideoComplete();
      }
    }
  };

  const startProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      if (player && player.getCurrentTime) {
        const currentTime = Math.floor(player.getCurrentTime());
        setWatchedSeconds(currentTime);

        const progress = {
          watchedSeconds: currentTime,
          isCompleted: false,
          lastWatched: new Date().toISOString(),
        };

        localStorage.setItem(`video_progress_${courseId}_${lessonId}`, JSON.stringify(progress));

        const currentProgress = (currentTime / (duration * 60)) * 100;

        if (onProgressUpdate) {
          onProgressUpdate(currentProgress, lessonId);
        }

        if (currentProgress >= 90 && !isCompleted) {
          handleVideoComplete();
        }
      }
    }, 1000);
  };

  const handleVideoComplete = () => {
    const progress = {
      watchedSeconds: duration * 60,
      isCompleted: true,
      lastWatched: new Date().toISOString(),
    };

    localStorage.setItem(`video_progress_${courseId}_${lessonId}`, JSON.stringify(progress));
    setIsCompleted(true);

    if (onProgressUpdate) {
      onProgressUpdate(100, lessonId);
    }

    if (onVideoComplete) {
      onVideoComplete(lessonId);
    }

    toast.success("Video completed! XP earned!", {
      description: "Great job on completing this lesson!",
    });
  };


  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-xl font-semibold">{title}</h3>
            {isCompleted && (
              <Badge className="bg-success text-success-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>

          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <div ref={playerRef} className="w-full h-full" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
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
