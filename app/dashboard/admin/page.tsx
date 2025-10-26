import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import nextDynamic from 'next/dynamic';

const AdminDashboardClient = nextDynamic(() => import('./AdminDashboardClient'), { ssr: false });

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: users, error } = await supabase.from('users').select('*');

    if (error) {
        console.error('Error fetching users:', error);
        return <div>Error fetching data. Please try again later.</div>;
    }

    return <AdminDashboardClient users={users} />;
}