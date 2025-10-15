'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import LottieLoading from "../../../src/components/LottieLoading";
import DashboardSkeleton from "../../../src/components/DashboardSkeleton";

interface Asset {
  id: number;
  name: string;
  status: string;
  location: string;
}

const AssetTracking = () => {
    const supabase = createClient();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('assets')
                .select('*');

            if (error) {
                console.error('Error fetching assets:', error);
            } else {
                setAssets(data);
            }
            setLoading(false);
        };

        fetchAssets();
    }, []);

    if (loading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Asset Tracking</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Asset ID</th>
                        <th className="py-2 px-4 border-b">Asset Name</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map(asset => (
                        <tr key={asset.id}>
                            <td className="py-2 px-4 border-b">{asset.id}</td>
                            <td className="py-2 px-4 border-b">{asset.name}</td>
                            <td className="py-2 px-4 border-b">{asset.status}</td>
                            <td className="py-2 px-4 border-b">{asset.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssetTracking;