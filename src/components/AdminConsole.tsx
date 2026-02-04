import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
  read: boolean;
}

interface AdminConsoleProps {
  onClose: () => void;
}

const AdminConsole: React.FC<AdminConsoleProps> = ({ onClose }) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (err) {
      console.error('Error loading submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await supabase
        .from('contact_submissions')
        .update({ read: true })
        .eq('id', id);

      setSubmissions(prev =>
        prev.map(s => (s.id === id ? { ...s, read: true } : s))
      );
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const markAsUnread = async (id: string) => {
    try {
      await supabase
        .from('contact_submissions')
        .update({ read: false })
        .eq('id', id);

      setSubmissions(prev =>
        prev.map(s => (s.id === id ? { ...s, read: false } : s))
      );
    } catch (err) {
      console.error('Error marking as unread:', err);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      setSubmissions(prev => prev.filter(s => s.id !== id));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
  };

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'unread') return !s.read;
    if (filter === 'read') return s.read;
    return true;
  });

  const unreadCount = submissions.filter(s => !s.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    if (!submission.read) {
      markAsRead(submission.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#1a1a2e] rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Contact Submissions</h2>
              <p className="text-sm text-gray-500">
                {submissions.length} total • {unreadCount} unread
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadSubmissions}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-gray-50">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-[#1a1a2e] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'unread' && unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Submissions list */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <svg className="w-8 h-8 animate-spin text-[#1a1a2e]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-center">No submissions found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredSubmissions.map((submission) => (
                  <button
                    key={submission.id}
                    onClick={() => handleViewSubmission(submission)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedSubmission?.id === submission.id ? 'bg-blue-50' : ''
                    } ${!submission.read ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!submission.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                          <p className={`font-medium text-[#1a1a2e] truncate ${!submission.read ? 'font-semibold' : ''}`}>
                            {submission.name}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{submission.email}</p>
                        <p className="text-sm text-gray-400 truncate mt-1">{submission.message}</p>
                      </div>
                      <p className="text-xs text-gray-400 flex-shrink-0">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submission detail */}
          <div className="flex-1 overflow-y-auto">
            {selectedSubmission ? (
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1a1a2e]">{selectedSubmission.name}</h3>
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedSubmission.email}
                    </a>
                    {selectedSubmission.company && (
                      <p className="text-gray-500 mt-1">{selectedSubmission.company}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => selectedSubmission.read ? markAsUnread(selectedSubmission.id) : markAsRead(selectedSubmission.id)}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Mark as {selectedSubmission.read ? 'unread' : 'read'}
                    </button>
                    <button
                      onClick={() => deleteSubmission(selectedSubmission.id)}
                      className="px-3 py-1.5 text-sm bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedSubmission.message}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Received: {formatDate(selectedSubmission.created_at)}</span>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-[#1a1a2e] mb-4">Quick Actions</h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selectedSubmission.email}?subject=Re: Your inquiry to Clova Med`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white rounded-lg hover:bg-[#2a2a4e] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Reply via Email
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedSubmission.email);
                        alert('Email copied to clipboard!');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Email
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
                <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-medium">Select a submission to view</p>
                <p className="text-sm">Click on any submission from the list</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;
