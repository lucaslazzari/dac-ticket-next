import React, { useState, useEffect } from 'react';
import { Ticket, TicketStatus, TicketPriority, Comment } from '../types/ticket';
import { X } from 'lucide-react';

interface Props {
  ticket: Ticket | null;
  onClose: () => void;
  onSave: (updatedTicket: Ticket) => void;
}

const STATUS_OPTIONS: TicketStatus[] = ['Open', 'InProgress', 'Resolved', 'Closed'];
const PRIORITY_OPTIONS: TicketPriority[] = ['Low', 'Medium', 'High', 'Critical'];

export function TicketDetailsModal({ ticket, onClose, onSave }: Props) {
  const [status, setStatus] = useState<TicketStatus>('Open');
  const [priority, setPriority] = useState<TicketPriority>('Low');
  const [assignedUserName, setAssignedUserName] = useState<string | undefined>(undefined);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setPriority(ticket.priority);
      setAssignedUserName(ticket.assignedUserName);
      setComments(ticket.comments);
      setCommentText('');
    }
  }, [ticket]);

  if (!ticket) return null;

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      authorId: 'currentUserId', // substituir pelo usuário logado real
      authorName: 'Current User', // substituir pelo nome real
      createdAt: new Date().toISOString(),
      content: commentText.trim(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setCommentText('');
  };

  const handleSave = () => {
    const updatedTicket: Ticket = {
      ...ticket,
      status,
      priority,
      assignedUserName,
      comments,
    };
    onSave(updatedTicket);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-lg">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-4 border-b bg-white rounded-t-xl">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{ticket.title}</h2>
            <p className="text-sm text-gray-500">ID: <span className="font-mono">{ticket.id}</span></p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TicketStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TicketPriority)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                {PRIORITY_OPTIONS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Assigned User</label>
              <input
                type="text"
                value={assignedUserName ?? ''}
                onChange={e => setAssignedUserName(e.target.value)}
                placeholder="Assign to..."
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <p className="whitespace-pre-wrap border border-gray-300 rounded p-3">{ticket.description}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Comments</label>
            <div className="max-h-48 overflow-auto border border-gray-300 rounded p-3 space-y-2">
              {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
              {comments.map(c => (
                <div key={c.id} className="border-b border-gray-200 pb-1">
                  <p className="text-sm font-semibold">{c.authorName} <span className="text-xs text-gray-400">({new Date(c.createdAt).toLocaleString()})</span></p>
                  <p className="text-sm">{c.content}</p>
                </div>
              ))}
            </div>
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded resize-y"
              rows={3}
            />
            <button
              onClick={handleAddComment}
              className="mt-2 bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-4 py-2 rounded font-semibold"
            >
              Add Comment
            </button>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#44C0CF] hover:bg-[#3ab0bf] text-white rounded font-semibold"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}