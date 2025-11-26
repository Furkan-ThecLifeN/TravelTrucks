import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async ({ page = 1, limit = 4, filters = {} }, thunkAPI) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
      });

      if (filters.location) params.append('location', filters.location);
      if (filters.form) params.append('form', filters.form);

      if (filters.AC) params.append('AC', "true");
      if (filters.kitchen) params.append('kitchen', "true");
      if (filters.TV) params.append('TV', "true");
      if (filters.bathroom) params.append('bathroom', "true");
      if (filters.transmission) params.append('transmission', "automatic");

      const response = await axios.get(`${API_URL}?${params.toString()}`);
      return response.data;

    } catch (error) {
      if (error.response && error.response.status === 404) {
        return [];
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchOne',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    currentItem: null,
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    isLoading: false,
    error: null,
    filters: {
      location: '',
      form: '',
      features: []
    }
  },
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
    toggleFavorite: (state, action) => {
      const camper = action.payload;
      const index = state.favorites.findIndex(c => c.id === camper.id);

      if (index === -1) {
        state.favorites.push(camper);
      } else {
        state.favorites.splice(index, 1);
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        let newItems = [];
        if (Array.isArray(action.payload)) newItems = action.payload;
        else if (action.payload && Array.isArray(action.payload.items)) newItems = action.payload.items;

        const requestPage = action.meta.arg.page;

        if (requestPage === 1) {
          state.items = newItems;
        } else {
          const existingIds = new Set(state.items.map(item => item.id));
          const uniqueNewItems = newItems.filter(item => !existingIds.has(item.id));
          state.items = [...state.items, ...uniqueNewItems];
        }
      })

      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload !== "Request failed with status code 404") {
          state.error = action.payload;
        }
      })

      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.currentItem = null;
      })

      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentItem = action.payload;
      });
  },
});

export const { toggleFavorite, setFilters, clearItems } = campersSlice.actions;
export default campersSlice.reducer;
