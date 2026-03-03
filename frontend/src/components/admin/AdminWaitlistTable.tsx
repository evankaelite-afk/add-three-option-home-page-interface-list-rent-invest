import { useState, useMemo } from 'react';
import { useGetWaitlistEntries } from '../../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search, AlertCircle, Users } from 'lucide-react';
import type { WaitlistEntry } from '../../backend';

export default function AdminWaitlistTable() {
  const { data: entries, isLoading, error } = useGetWaitlistEntries();
  const [searchQuery, setSearchQuery] = useState('');

  // Sort entries newest-first and filter by search query
  const filteredEntries = useMemo(() => {
    if (!entries) return [];

    const sorted = [...entries].sort((a, b) => {
      const timeA = Number(a.timestamp);
      const timeB = Number(b.timestamp);
      return timeB - timeA; // Newest first
    });

    if (!searchQuery.trim()) return sorted;

    const query = searchQuery.toLowerCase();
    return sorted.filter((entry) => {
      return (
        entry.name.toLowerCase().includes(query) ||
        entry.email.toLowerCase().includes(query) ||
        entry.phoneNumber.toLowerCase().includes(query)
      );
    });
  }, [entries, searchQuery]);

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000); // Convert nanoseconds to milliseconds
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Waitlist</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load waitlist entries. Please try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  // Empty state
  if (!entries || entries.length === 0) {
    return (
      <Alert>
        <Users className="h-4 w-4" />
        <AlertTitle>No Entries Yet</AlertTitle>
        <AlertDescription>
          The waitlist is currently empty. Entries will appear here as users sign up for early access.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredEntries.length} of {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
      </div>

      {/* Table */}
      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Investor Type</TableHead>
              <TableHead>Registered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No entries match your search
                </TableCell>
              </TableRow>
            ) : (
              filteredEntries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.email}</TableCell>
                  <TableCell>{entry.phoneNumber}</TableCell>
                  <TableCell>
                    {entry.investorType ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground">
                        {entry.investorType}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(entry.timestamp)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
