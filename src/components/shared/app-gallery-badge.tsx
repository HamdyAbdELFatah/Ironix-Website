import * as React from "react";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/utils/constants";

interface BadgeProps {
  section?: string;
  className?: string;
}

export function AppGalleryBadge({ section = "hero", className }: BadgeProps) {
  const url = APP_CONFIG.utm("huawei", section);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Explore Ironix on Huawei AppGallery"
      className={cn(
        "inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border/80 bg-card/80 backdrop-blur-sm text-foreground hover:bg-card hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-200 group active:scale-[0.98]",
        className
      )}
    >
      {/* Official Huawei AppGallery Icon Vector */}
      <svg
        className="w-7 h-7 flex-shrink-0"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="agGrad"
            x1="18"
            y1="0"
            x2="18"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FB6361" offset="0%" />
            <stop stopColor="#ED3E45" offset="100%" />
          </linearGradient>
        </defs>
        {/* Official AppGallery Squircle */}
        <path
          d="M 10.101 0 C 2.705 0 0 2.705 0 10.1 V 25.9 C 0 33.295 2.705 36 10.101 36 H 25.894 C 33.29 36 36 33.295 36 25.9 V 10.1 C 36 2.705 33.295 0 25.899 0 Z"
          fill="url(#agGrad)"
        />
        {/* Official HUAWEI wordmark & bag handles */}
        <path
          d="M 15.703 20.879 H 17.148 L 16.423 19.193 Z M 15.347 21.729 L 14.918 22.71 H 13.942 L 16.018 18.001 H 16.862 L 18.93 22.71 H 17.927 L 17.504 21.729 Z M 31.056 22.707 H 32 V 18 H 31.056 Z M 27.301 20.685 H 29.04 V 19.827 H 27.301 V 18.862 H 29.826 V 18.004 H 26.358 V 22.71 H 29.917 V 21.852 H 27.301 Z M 23.552 21.241 L 22.482 18 H 21.701 L 20.632 21.241 L 19.591 18.002 H 18.573 L 20.216 22.712 H 21.007 L 22.079 19.619 L 23.15 22.712 H 23.948 L 25.587 18.002 H 24.595 Z M 12.502 20.698 C 12.502 21.464 12.121 21.873 11.43 21.873 C 10.735 21.873 10.353 21.452 10.353 20.665 V 18.003 H 9.397 V 20.698 C 9.397 22.023 10.134 22.783 11.417 22.783 C 12.714 22.783 13.457 22.008 13.457 20.658 V 18.003 H 12.502 Z M 7.115 18 H 8.071 V 22.713 H 7.115 V 20.799 H 4.956 V 22.713 H 4 V 18 H 4.956 V 19.901 H 7.115 Z"
          fill="#ffffff"
        />
        <path
          d="M 18 12 C 14.691 12 12 9.308 12 6 H 12.848 C 12.848 8.841 15.159 11.152 18 11.152 C 20.841 11.152 23.152 8.841 23.152 6 H 24 C 24 9.308 21.308 12 18 12"
          fill="#ffffff"
        />
      </svg>
      <div className="flex flex-col text-left rtl:text-right">
        <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground leading-tight">
          EXPLORE IT ON
        </span>
        <span className="text-sm font-bold tracking-tight text-foreground leading-tight">
          AppGallery
        </span>
      </div>
    </a>
  );
}
