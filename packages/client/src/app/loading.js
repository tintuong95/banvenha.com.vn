'use client'

import { Skeleton } from "antd";

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return <Skeleton className="mt-5" active />;
}
