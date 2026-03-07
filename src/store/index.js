import create from 'zustand';

const useStore = create((set) => ({
  // Auth state
  user: null,
  isAuthenticated: false,
  userType: null, // 'plumber' or 'client'
  
  // Job state
  jobs: [],
  currentJob: null,
  
  // Profile state
  plumbers: [],
  currentPlumber: null,
  
  // Forum state
  forumPosts: [],
  currentPost: null,
  
  // Chat state
  conversations: [],
  messages: [],
  
  // UI state
  notifications: [],
  isLoading: false,
  
  // Actions
  setUser: (user, userType) => set({ 
    user, 
    userType, 
    isAuthenticated: !!user 
  }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false, 
    userType: null 
  }),
  
  setJobs: (jobs) => set({ jobs }),
  setCurrentJob: (job) => set({ currentJob: job }),
  
  setPlumbers: (plumbers) => set({ plumbers }),
  setCurrentPlumber: (plumber) => set({ currentPlumber: plumber }),
  
  setForumPosts: (posts) => set({ forumPosts: posts }),
  setCurrentPost: (post) => set({ currentPost: post }),
  
  setConversations: (conversations) => set({ conversations }),
  setMessages: (messages) => set({ messages }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useStore;
