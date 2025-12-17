import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { translateToRussian } from '../utils/translate';
import { getBoredApiUrl } from '../api/getBoredApiUrl';

export type Activity = {
  key: number;
  activity: string;
  type: string;
  accessibility: number;
  duration: number;
  completed?: boolean;
};

type ActivityState = {
  items: Activity[];
  loading: boolean;
  error: string | null;
};

// Загружаем из localStorage при старте
const loadFromStorage = (): Activity[] => {
  try {
    const saved = localStorage.getItem('activities');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: ActivityState = {
  items: loadFromStorage(),
  loading: false,
  error: null,
};

export const fetchActivity = createAsyncThunk(
  'activity/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(getBoredApiUrl());
      
      if (!res.ok) {
        throw new Error('Ошибка загрузки');
      }
      
      const data = await res.json();
      
      const translatedActivity = await translateToRussian(data.activity);

      return {
        ...data,
        activity: translatedActivity,
        originalActivity: data.activity,
      };
    } catch {
      return rejectWithValue('Слишком много запросов. Сорри( апи беслпатный, долгий');
    }
  }
);

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    clearActivities: (state) => {
      state.items = [];
      localStorage.setItem('activities', JSON.stringify([]));
    },
    toggleActivity: (state, action) => {
      const item = state.items.find(i => i.key === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
      localStorage.setItem('activities', JSON.stringify(state.items));
    },
    deleteActivity: (state, action) => {
      state.items = state.items.filter(i => i.key !== action.payload);
      localStorage.setItem('activities', JSON.stringify(state.items));
    },
    updateActivity: (state, action) => {
      const { key, activity } = action.payload;
      const item = state.items.find(i => i.key === key);
      if (item) {
        item.activity = activity;
      }
      localStorage.setItem('activities', JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        //сохраняем в localStorage
        localStorage.setItem('activities', JSON.stringify(state.items));
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearActivities, toggleActivity, deleteActivity, updateActivity } = activitySlice.actions;
export default activitySlice.reducer;
