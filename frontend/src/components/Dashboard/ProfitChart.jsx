import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ProfitChart = ({ crops }) => {
  const { t } = useLanguage();
  if (!crops || crops.length === 0) return null;

  const data = crops.map((crop) => ({
    name: crop.name,
    profit: crop.expected_profit,
    confidence: crop.confidence,
  }));

  const colors = ['#38a76b', '#5ec38c', '#95dbb3'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-agri-100">
          <p className="font-semibold text-agri-900">{label}</p>
          <p className="text-sm text-agri-600">
            {t('expectedProfit')}: <span className="font-bold text-agri-800">₹{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-agri-100 p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-agri-100 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-agri-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-agri-900">{t('profitChart')}</h2>
          <p className="text-sm text-agri-500">{t('profitChartSub')}</p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e1f6e8" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#236c44', fontSize: 12 }}
              axisLine={{ stroke: '#c3ebd4' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#236c44', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f2fbf5' }} />
            <Bar dataKey="profit" radius={[8, 8, 0, 0]} maxBarSize={80}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitChart;
