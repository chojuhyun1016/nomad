"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function HeroVideoModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="group relative w-full aspect-video rounded-xl bg-slate-700/50 border border-slate-600 overflow-hidden transition-all hover:border-slate-500 hover:bg-slate-700/70 cursor-pointer"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
            <Play className="h-8 w-8 text-white fill-white" />
          </div>
        </div>
        <p className="absolute bottom-4 left-4 text-sm text-slate-400">
          Korea Nomad 소개 영상
        </p>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Korea Nomad 소개</DialogTitle>
        </DialogHeader>
        <div className="aspect-video bg-slate-900 flex items-center justify-center">
          <p className="text-slate-500 text-sm">영상 플레이어 (placeholder)</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
