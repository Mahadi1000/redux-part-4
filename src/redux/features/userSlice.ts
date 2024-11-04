import { auth } from '@/firebase/firebase.config';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
interface ICredential {
  email: string;
  password: string;
}
const initialState = {
  user: {
    email: '' as string | null,
  },
  loading: false,
  iserror: false,
  error: null as string ,
};

export const createUser = createAsyncThunk(
  'userSlice/createUser',
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    console.log(data);
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder)=> {
    builder.addCase(createUser.pending, (state)=>{
        state.loading = true;
        state.iserror = false;
    })
    builder.addCase(createUser.fulfilled, (state, action)=>{
        state.user.email = action.payload.user.email
        state.loading = false;
        state.iserror = false;
    })
    builder.addCase(createUser.rejected, (state, action)=>{
        state.loading = false;
        state.iserror = true;
        state.error = action.error.message || "error occured"
    })
    
  }
  
});
export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
