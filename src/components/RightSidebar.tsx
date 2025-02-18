
import { Activity, Radar, TrendingUp, Users, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
  isDarkMode: boolean;
  rightSidebarOpen: boolean;
}

export const RightSidebar = ({ isDarkMode, rightSidebarOpen }: RightSidebarProps) => {
  return (
    <div
      className={cn(
        "fixed right-0 top-16 h-[calc(100%-4rem)] w-80 border-l transition-all duration-300 ease-in-out z-20 overflow-y-auto",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
        rightSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="p-4">
        <div className="space-y-4">
          <div className={cn(
            "p-4 rounded-lg border",
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-sm font-medium mb-3 flex items-center gap-2",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>
              <Target className="h-4 w-4" />
              Key Attributes
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {["Pace", "Technique", "Vision", "Strength"].map((attr) => (
                <div
                  key={attr}
                  className={cn(
                    "p-2 rounded-lg",
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                  )}
                >
                  <p className={cn(
                    "text-xs font-medium",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>{attr}</p>
                  <p className={cn(
                    "text-lg font-semibold",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>85</p>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-lg border",
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-sm font-medium mb-3 flex items-center gap-2",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>
              <TrendingUp className="h-4 w-4" />
              Performance Trends
            </h3>
            <div className={cn(
              "h-32 rounded-lg flex items-center justify-center",
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            )}>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>Performance data visualization</p>
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-lg border",
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-sm font-medium mb-3 flex items-center gap-2",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>
              <Users className="h-4 w-4" />
              Similar Players
            </h3>
            <div className="space-y-2">
              {["Jude Bellingham", "Pedri", "Gavi"].map((player) => (
                <div
                  key={player}
                  className={cn(
                    "p-2 rounded-lg flex items-center justify-between",
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                  )}
                >
                  <span className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  )}>{player}</span>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                  )}>92% match</span>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-lg border",
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-sm font-medium mb-3 flex items-center gap-2",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>
              <Activity className="h-4 w-4" />
              Latest Match Performance
            </h3>
            <div className="space-y-2">
              <div className={cn(
                "p-3 rounded-lg",
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              )}>
                <div className="flex justify-between items-center mb-2">
                  <span className={cn(
                    "text-xs",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>vs Manchester City</span>
                  <span className={cn(
                    "text-xs",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>Yesterday</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Minutes", value: "90'" },
                    { label: "Goals", value: "1" },
                    { label: "Assists", value: "2" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className={cn(
                        "text-xs",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>{stat.label}</p>
                      <p className={cn(
                        "text-sm font-semibold",
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      )}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-lg border",
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-sm font-medium mb-3 flex items-center gap-2",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>
              <Radar className="h-4 w-4" />
              Skill Radar
            </h3>
            <div className={cn(
              "h-48 rounded-lg flex items-center justify-center",
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            )}>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>Radar chart visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
