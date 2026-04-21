const MetricCard = ({ title, value, unit, icon: Icon, color = 'agri' }) => {
  const colorClasses = {
    agri: 'bg-agri-50 text-agri-700 border-agri-200',
    earth: 'bg-earth-50 text-earth-700 border-earth-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const iconClasses = {
    agri: 'bg-agri-100 text-agri-600',
    earth: 'bg-earth-100 text-earth-600',
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
    rose: 'bg-rose-100 text-rose-600',
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]} hover:shadow-md transition-shadow animate-slide-up`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-xl font-bold">
            {value}
            {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
