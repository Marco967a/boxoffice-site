export interface Title {
	rank: number;
	title: string;
	weekly_gross: number;
	screen_count: number | null;
}
export interface WeekPoint {
	week_start: string;
	total_gross: number;
	titles: number;
}
export interface BoxOfficeData {
	currency: string;
	latest_week: string;
	weekly_trend: WeekPoint[];
	top_titles: Title[];
}

export function computeMetrics(data: BoxOfficeData) {
	const trend = data.weekly_trend;
	const latest = trend[trend.length - 1];
	const previous = trend.length > 1 ? trend[trend.length - 2] : null;
	const top = data.top_titles;

	const topGross = top.reduce((s, t) => s + t.weekly_gross, 0);
	const topScreens = top.reduce((s, t) => s + (t.screen_count ?? 0), 0);
	const withScreens = top.filter((t) => t.screen_count);
	const perScreen = withScreens.map((t) => ({ ...t, avg: t.weekly_gross / (t.screen_count as number) }));
	const bestPerScreen = perScreen.reduce<(typeof perScreen)[number] | null>(
		(best, t) => (!best || t.avg > best.avg ? t : best),
		null,
	);

	// La classifica dovrebbe essere in ordine decrescente di incasso: se non lo è, la fonte ha un'anomalia.
	const sortedOk = top.every((t, i) => i === 0 || t.weekly_gross <= top[i - 1].weekly_gross);

	return {
		total: latest.total_gross,
		titles: latest.titles,
		wowPct: previous ? (latest.total_gross - previous.total_gross) / previous.total_gross : null,
		leader: top[0] ?? null,
		leaderShare: top[0] ? top[0].weekly_gross / latest.total_gross : null,
		topShare: topGross / latest.total_gross,
		topCount: top.length,
		topScreens,
		avgPerTitle: latest.total_gross / latest.titles,
		leaderGap: top.length > 1 ? top[0].weekly_gross - top[1].weekly_gross : null,
		bestPerScreen,
		sortedOk,
	};
}
