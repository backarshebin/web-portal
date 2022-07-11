import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUsers, createUser, updateUser } from "../api/userApi";
import { PAGE_LIMIT } from "../../../constants";

const initialState = {
  status: "idle",
  currentPage: 1,
  userList: [],
  total: 0,
  currentUser: null,
  message: "",
};

export const fetchUserAsync = createAsyncThunk(
  "userlist/fetchUserAsync",
  async ({ searchTerm = "", searchAll = false, currentPage = 1 }) => {
    const response = await fetchUsers({
      searchTerm,
      searchAll,
      currentPage,
      limit: PAGE_LIMIT,
    });

    return response;
  }
);
export const createUserAsync = createAsyncThunk(
  "userform/createUserAsync",
  async (userToSave) => {
    const response = await createUser({
      userToSave,
    });

    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "userform/updateUserAsync",
  async (userToSave) => {
    const response = await updateUser(userToSave);
    return response;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetUserList: (state) => {
      state.userList = [];
    },
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentPage = action.payload.offset / PAGE_LIMIT + 1;
        state.userList = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload.data;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload.data;
      })
      .addMatcher(
        isAnyOf(updateUserAsync.fulfilled, createUserAsync.fulfilled),
        (state, action) => {
          state.status = "idle";
          state.currentUser = action.payload.data;
          state.message = "User details saved";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchUserAsync.pending,
          createUserAsync.pending,
          updateUserAsync.pending
        ),
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          updateUserAsync.rejected,
          createUserAsync.rejected,
          fetchUserAsync.rejected
        ),
        (state, action) => {
          state.status = "error";
          state.message = action.error.message;
          console.error(state.message);
        }
      );
  },
});

export const { setCurrentPage, setCurrentUser, resetUserList, resetMessage } =
  usersSlice.actions;

export const selectUserList = (state) => state.users.userList;
export const selectCurrentPage = (state) => {
  return state.users.currentPage;
};

export const selectStatus = (state) => state.users.status;
export const selectTotalSize = (state) => state.users.total;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectMessage = (state) => state.users.message;

export default usersSlice.reducer;
