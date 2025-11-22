import { CheckCircle, Target, BarChart2, BrainCircuit, Dumbbell, Signal } from 'lucide-react';

const ProgressBarStat = ({ value, total, colorClass, title, icon, onDifficultyChange }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <button
      onClick={() => onDifficultyChange(title)}
      className="w-full text-left p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600 group hover:shadow-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200 transform hover:scale-[1.02]"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
            {title}
          </span>
        </div>
        <span className="text-sm font-bold tabular-nums text-slate-600 dark:text-slate-300">
          {value}/{total}
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5 shadow-inner overflow-hidden">
        <div
          className={`${colorClass} h-2.5 rounded-full transition-all duration-500 shadow-sm`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </button>
  );
};

const UserStats = ({ stats, onStatusChange, onDifficultyChange }) => {

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-lg shadow-md mr-3">
            <BarChart2 size={20} className="text-white" />
          </div>
          My Stats
        </h3>

        <div className="text-center mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Total Solved</p>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {stats.solved}
            <span className="text-2xl font-semibold text-slate-600 dark:text-slate-400">
              /{stats.total}
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onStatusChange('Solved')}
            className="w-full flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/50 group hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
          >
            <div className="flex items-center">
              <div className="p-1.5 bg-green-500 dark:bg-green-600 rounded-lg mr-3">
                <CheckCircle size={18} className="text-white" />
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Solved
              </span>
            </div>
            <span className="font-bold text-xl text-green-600 dark:text-green-400">
              {stats.solved}
            </span>
          </button>

          <button
            onClick={() => onStatusChange('Attempted')}
            className="w-full flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50 group hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
          >
            <div className="flex items-center">
              <div className="p-1.5 bg-blue-500 dark:bg-blue-600 rounded-lg mr-3">
                <Target size={18} className="text-white" />
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Attempted
              </span>
            </div>
            <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
              {stats.attempted}
            </span>
          </button>
        </div>

        <div className="my-6 border-t border-slate-200 dark:border-slate-700"></div>

        <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <BrainCircuit size={20} className="text-blue-500 dark:text-blue-400" />
          Difficulty Breakdown
        </h4>
      <div className="space-y-3">
          <ProgressBarStat
            title="Basic"
            icon={<Signal size={16} className="text-[#4299E1]" />}
            value={stats.solvedByDifficulty.Basic}
            total={stats.totalByDifficulty.Basic}
            onDifficultyChange={onDifficultyChange}
            colorClass="bg-[#4299E1]"   // Blue color
          />
        <ProgressBarStat
          title="Easy"
          icon={<Signal size={16} className="text-green-500" />}
          value={stats.solvedByDifficulty.Easy}
          total={stats.totalByDifficulty.Easy}
          onDifficultyChange={onDifficultyChange}
          colorClass="bg-green-500"
        />
        <ProgressBarStat
          title="Medium"
          icon={<Dumbbell size={16} className="text-yellow-500" />}
          value={stats.solvedByDifficulty.Medium}
          total={stats.totalByDifficulty.Medium}
          onDifficultyChange={onDifficultyChange}
          colorClass="bg-yellow-500"
        />
        <ProgressBarStat
          title="Hard"
          icon={<BrainCircuit size={16} className="text-red-500" />}
          value={stats.solvedByDifficulty.Hard}
          total={stats.totalByDifficulty.Hard}
          onDifficultyChange={onDifficultyChange}
          colorClass="bg-red-500"
        />
      </div>
    </div>
    </div>
  );
};

export default UserStats;
