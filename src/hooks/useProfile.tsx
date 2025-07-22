import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  user_id: string;
  name: string;
  age: number | null;
  location: string | null;
  bio: string | null;
  user_type: 'participant' | 'carer';
  interests_skills: string[];
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: {
    name: string;
    age: string;
    location: string;
    bio: string;
    user_type: 'participant' | 'carer';
    interests: string[];
    experience: string[];
  }) => {
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        name: profileData.name,
        age: profileData.age ? parseInt(profileData.age) : null,
        location: profileData.location,
        bio: profileData.bio,
        user_type: profileData.user_type,
        interests_skills: profileData.user_type === 'participant' 
          ? profileData.interests 
          : profileData.experience,
      })
      .select()
      .single();

    if (error) throw error;
    setProfile(data as Profile);
    return data;
  };

  return {
    profile,
    loading,
    createProfile,
    refetch: fetchProfile,
  };
};