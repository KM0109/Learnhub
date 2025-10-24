import { useState, useEffect, useRef } from "react";
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
  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const watchProgress = duration > 0 ? Math.min((watchedSeconds / (duration * 60)) * 100, 100) : 0;

  useEffect(() => {
    const savedProgress = localStorage.getItem(`video_progress_${courseId}_${lessonId}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setWatchedSeconds(progress.watchedSeconds || 0);
      setIsCompleted(progress.isCompleted || false);
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videoId, courseId, lessonId]);

  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === (window as any).YT.PlayerState.PLAYING) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          setWatchedSeconds(prev => {
            const newProgress = Math.max(prev, currentTime);

            const progress = {
              watchedSeconds: newProgress,
              isCompleted: newProgress >= (duration * 60 * 0.9),
              lastWatched: new Date().toISOString(),
            };

            localStorage.setItem(`video_progress_${courseId}_${lessonId}`, JSON.stringify(progress));

            if (onProgressUpdate) {
              onProgressUpdate((newProgress / (duration * 60)) * 100);
            }

            if (progress.isCompleted && !isCompleted) {
              setIsCompleted(true);
            }

            return newProgress;
          });
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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
            <div id="youtube-player"></div>
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
