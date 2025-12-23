import { useMemo } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinance } from '@/contexts/FinanceContext';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';
import { PieChart as PieChartIcon, BarChart3 as BarChartIcon } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const COIN_COLORS: Record<string, string> = {
    BTC: '#F7931A', // Bitcoin Orange
    CRO: '#1060FF', // Cronos Blue (Brighter for dark mode visibility)
    ETH: '#627EEA', // Ethereum Blue
    SOL: '#14F195', // Solana Green
    USDT: '#26A17B', // Tether Green
    BNB: '#F3BA2F', // Binance Yellow
    ADA: '#0033AD', // Cardano Blue
    XRP: '#00AACE', // XRP Blue
    DOGE: '#C2A633', // Dogecoin Gold
    DOT: '#E6007A', // Polkadot Pink
    AVAX: '#E84142', // Avalanche Red
    MATIC: '#8247E5', // Polygon Purple
    LINK: '#2A5ADA', // Chainlink Blue
};

const getCoinColor = (symbol: string, index: number) => {
    return COIN_COLORS[symbol.toUpperCase()] || COLORS[index % COLORS.length];
};

export function CryptoAllocationChart() {
    const { data } = useFinance();
    const { formatCurrency, isPrivacyMode } = useSettings();

    const chartData = useMemo(() => {
        const totalValue = data.crypto.reduce((sum, c) => sum + (c.quantity * c.currentPrice), 0);

        return data.crypto
            .map((c) => ({
                name: c.symbol,
                value: c.quantity * c.currentPrice,
                percentage: totalValue > 0 ? ((c.quantity * c.currentPrice) / totalValue) * 100 : 0
            }))
            .filter(item => item.value > 0)
            .sort((a, b) => b.value - a.value);
    }, [data.crypto]);

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-primary" />
                    Portfolio Allocation
                </CardTitle>
            </CardHeader>
            <CardContent className={cn("h-[300px]", isPrivacyMode && "blur-sm select-none pointer-events-none")}>
                {chartData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                        No assets found
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getCoinColor(entry.name, index)} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => isPrivacyMode ? "****" : formatCurrency(value)}
                                contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#FFFFFF" }}
                                itemStyle={{ color: "#FFFFFF" }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}

export function CryptoPerformanceChart() {
    const { data } = useFinance();
    const { formatCurrency, isPrivacyMode, currencySymbol } = useSettings();

    const chartData = useMemo(() => {
        return data.crypto
            .map((c) => ({
                name: c.symbol,
                Invested: c.quantity * c.avgBuyPrice,
                Current: c.quantity * c.currentPrice,
            }))
            .filter(item => item.Current > 0 || item.Invested > 0)
            .sort((a, b) => b.Current - a.Current); // Sort by current value
    }, [data.crypto]);

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-success" />
                    Performance (Invested vs Current)
                </CardTitle>
            </CardHeader>
            <CardContent className={cn("h-[300px]", isPrivacyMode && "blur-sm select-none pointer-events-none")}>
                {chartData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                        No assets found
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} barGap={0}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis
                                hide={isPrivacyMode}
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `${currencySymbol}${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                                formatter={(value: number) => isPrivacyMode ? "****" : formatCurrency(value)}
                            />
                            <Legend />
                            <Bar dataKey="Invested" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            <Bar dataKey="Current" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
