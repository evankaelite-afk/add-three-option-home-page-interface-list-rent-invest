import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { Property, WaitlistEntry, Listing } from '../backend';

export function useGetFeaturedProperties() {
  const { actor, isFetching } = useActor();

  return useQuery<Property[]>({
    queryKey: ['featuredProperties'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProperties();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPropertyById(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Property | null>({
    queryKey: ['property', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getPropertyById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useJoinWaitlist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      phoneNumber,
      investorType,
    }: {
      name: string;
      email: string;
      phoneNumber: string;
      investorType: string | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.joinWaitlist(name, email, phoneNumber, investorType);
      if (!result) {
        throw new Error('Failed to join waitlist');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlist'] });
    },
  });
}

// Admin-specific hooks
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useGetWaitlistEntries() {
  const { actor, isFetching } = useActor();

  return useQuery<WaitlistEntry[]>({
    queryKey: ['waitlist'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getWaitlistEntries();
      } catch (error: any) {
        if (error.message?.includes('Unauthorized') || error.message?.includes('trap')) {
          throw new Error('Access denied: Admin privileges required');
        }
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// Listing hooks
export function useCreateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      price,
      images,
    }: {
      title: string;
      description: string;
      price: bigint;
      images: Uint8Array[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.createListing(title, description, price, images);
      } catch (error: any) {
        if (error.message?.includes('Unauthorized') || error.message?.includes('trap')) {
          throw new Error('You must be logged in to create a listing');
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myListings'] });
      queryClient.invalidateQueries({ queryKey: ['allListings'] });
    },
  });
}

export function useGetMyListings() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Listing[]>({
    queryKey: ['myListings', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      try {
        return await actor.getListingsBySeller(identity.getPrincipal());
      } catch (error: any) {
        if (error.message?.includes('Unauthorized') || error.message?.includes('trap')) {
          throw new Error('Access denied: You can only view your own listings');
        }
        throw error;
      }
    },
    enabled: !!actor && !isFetching && !!identity,
    retry: false,
  });
}

export function useGetAllListings() {
  const { actor, isFetching } = useActor();

  return useQuery<Listing[]>({
    queryKey: ['allListings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetListingById(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Listing | null>({
    queryKey: ['listing', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getListingById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}
