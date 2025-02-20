
import { cn } from "@/lib/utils";

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className="h-8 w-8 rounded-full"
        style={{
          backgroundImage: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 3s ease infinite, spin 1s linear infinite"
        }}
      />
    </div>
  );
};
