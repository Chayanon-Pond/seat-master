"use client";

import React from "react";
import { useHistory } from "../../hooks/useHistory";

const HistorysPage: React.FC = () => {
	const { histories, isLoading, error } = useHistory();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div className="text-red-600">{error}</div>;

	return (
		<div className="p-6">
			<div className="overflow-x-auto">
				<table className="min-w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-300 px-4 py-2 text-left">Date time</th>
							<th className="border border-gray-300 px-4 py-2 text-left">Username</th>
							<th className="border border-gray-300 px-4 py-2 text-left">Concert name</th>
							<th className="border border-gray-300 px-4 py-2 text-left">Action</th>
						</tr>
					</thead>
					<tbody>
						{histories.length === 0 ? (
							<tr>
								<td colSpan={4} className="px-4 py-6 text-center text-gray-500">No histories found</td>
							</tr>
						) : (
							histories.map((h) => (
								<tr key={h.id} className="odd:bg-white even:bg-gray-50">
									<td className="border border-gray-300 px-4 py-2 align-top">{h.createdAt}</td>
									<td className="border border-gray-300 px-4 py-2 align-top">{h.userName}</td>
									<td className="border border-gray-300 px-4 py-2 align-top">{h.concertName}</td>
									<td className="border border-gray-300 px-4 py-2 align-top">{h.action}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default HistorysPage;
