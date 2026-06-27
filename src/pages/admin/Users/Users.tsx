import { useState } from 'react';
import { Search } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { Badge } from '@/components/common/Badge';
import { Pagination } from '@/components/common/Pagination';
import { users } from '@/data';
import { paginate } from '@/utils';
import { AppImage } from '@/components/common/AppImage';

export function AdminUsers() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const filtered = users.filter((u) =>
    !query || u.email.toLowerCase().includes(query.toLowerCase()) ||
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(query.toLowerCase())
  );
  const result = paginate(filtered, page, 15);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">{TEXT.ADMIN.USERS.TITLE}</h1>
      <p className="text-text-muted mt-1">{TEXT.ADMIN.USERS.SUBTITLE}</p>

      <div className="flex items-center gap-2 mt-6 mb-4 rounded-xl border border-border bg-white px-4 py-2 max-w-md">
        <Search className="h-5 w-5 text-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search users..."
          className="flex-1 text-sm focus:outline-none bg-transparent"
        />
      </div>

      <div className="rounded-2xl border border-border bg-white overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-text-muted">User</th>
              <th className="text-left px-4 py-3 font-medium text-text-muted hidden sm:table-cell">Email</th>
              <th className="text-left px-4 py-3 font-medium text-text-muted">Role</th>
              <th className="text-left px-4 py-3 font-medium text-text-muted hidden md:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {result.items.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <AppImage src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <span className="font-medium">{user.firstName} {user.lastName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{user.email}</td>
                <td className="px-4 py-3"><Badge variant="info">{user.role}</Badge></td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <Badge variant={user.isVerified ? 'success' : 'warning'}>
                    {user.isVerified ? 'Verified' : 'Pending'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={result.page} totalPages={result.totalPages} onPageChange={setPage} className="mt-6" />
    </div>
  );
}
