import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useConnections = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const sendConnectionRequest = async (recipientUserId: string) => {
    if (!user) throw new Error('No authenticated user');

    setLoading(true);
    try {
      const { error } = await supabase
        .from('connections')
        .insert({
          requester_id: user.id,
          recipient_id: recipientUserId,
          status: 'pending'
        });

      if (error) throw error;
      toast.success('Connection request sent!');
    } catch (error: any) {
      console.error('Error sending connection request:', error);
      if (error.code === '23505') {
        toast.error('Connection request already exists');
      } else {
        toast.error('Failed to send connection request');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateConnectionStatus = async (connectionId: string, status: 'accepted' | 'declined') => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('connections')
        .update({ status })
        .eq('id', connectionId);

      if (error) throw error;
      toast.success(`Connection ${status}!`);
    } catch (error) {
      console.error('Error updating connection:', error);
      toast.error(`Failed to ${status} connection`);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendConnectionRequest,
    updateConnectionStatus,
    loading,
  };
};