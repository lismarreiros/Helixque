"use client";

import {
  IconMicrophone,
  IconMicrophoneOff,
  IconVideo,
  IconVideoOff,
  IconPhoneOff,
  IconScreenShare,
  IconScreenShareOff,
  IconUserOff,
  IconRefresh,
  IconMessage,
  IconFlag,
} from "@tabler/icons-react";
import { MediaState } from "./VideoGrid";

interface ControlBarProps {
  mediaState: MediaState;
  showChat: boolean;
  onToggleMic: () => void;
  onToggleCam: () => void;
  onToggleScreenShare: () => void;
  onToggleChat: () => void;
  onRecheck: () => void;
  onNext: () => void;
  onLeave: () => void;
  onReport: () => void;
}

export default function ControlBar({
  mediaState,
  showChat,
  onToggleMic,
  onToggleCam,
  onToggleScreenShare,
  onToggleChat,
  onRecheck,
  onNext,
  onLeave,
  onReport
}: ControlBarProps) {
  const { micOn, camOn, screenShareOn } = mediaState;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 z-50">
      <div className="relative h-full flex items-center justify-center">
        {/* Bottom controls */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2 py-1.5 backdrop-blur">
          <button
            onClick={onRecheck}
            className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            title="Recheck"
          >
            <IconRefresh className="h-5 w-5" />
          </button>

          <button
            onClick={onToggleMic}
            className={`h-11 w-11 rounded-full flex items-center justify-center transition ${
              micOn ? "bg-white/10 hover:bg-white/20" : "bg-red-600 hover:bg-red-500"
            }`}
            title={micOn ? "Turn off microphone" : "Turn on microphone"}
          >
            {micOn ? <IconMicrophone className="h-5 w-5" /> : <IconMicrophoneOff className="h-5 w-5" />}
          </button>

          <button
            onClick={onToggleCam}
            className={`h-11 w-11 rounded-full flex items-center justify-center transition ${
              camOn ? "bg-white/10 hover:bg-white/20" : "bg-red-600 hover:bg-red-500"
            }`}
            title={camOn ? "Turn off camera" : "Turn on camera"}
          >
            {camOn ? <IconVideo className="h-5 w-5" /> : <IconVideoOff className="h-5 w-5" />}
          </button>

          <button
            onClick={onToggleScreenShare}
            className={`h-11 w-11 rounded-full flex items-center justify-center transition ${
              screenShareOn ? "bg-blue-600 hover:bg-blue-500" : "bg-white/10 hover:bg-white/20"
            }`}
            title={screenShareOn ? "Stop screen share" : "Start screen share"}
          >
            {screenShareOn ? <IconScreenShareOff className="h-5 w-5" /> : <IconScreenShare className="h-5 w-5" />}
          </button>

          <button
            onClick={onNext}
            className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            title="Next match"
          >
            <IconUserOff className="h-5 w-5" />
          </button>

          <button
            onClick={onLeave}
            className="ml-1 mr-1 h-11 rounded-full bg-red-600 px-6 hover:bg-red-500 flex items-center justify-center gap-2"
            title="Leave call"
          >
            <IconPhoneOff className="h-5 w-5" />
            <span className="hidden sm:inline text-sm font-medium">Leave</span>
          </button>
        </div>

        {/* Right side controls */}
        <div className="absolute right-6">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2 py-1.5 backdrop-blur">
            <button
              onClick={onToggleChat}
              className={`h-11 w-11 rounded-full flex items-center justify-center transition ${
                showChat ? "bg-indigo-600 hover:bg-indigo-500" : "bg-white/10 hover:bg-white/20"
              }`}
              title={showChat ? "Close chat" : "Open chat"}
            >
              <IconMessage className="h-5 w-5" />
            </button>
            
            <button
              onClick={onReport}
              className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              title="Report user"
            >
              <IconFlag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}