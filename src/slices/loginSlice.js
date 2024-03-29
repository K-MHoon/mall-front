import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
    email: "",
};

const loadMemberCookie = () => {
    const memberInfo = getCookie("member");

    // 닉네임 처리
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }

    return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
    return loginPost(param);
});

const loginSlice = createSlice({
    name: "LoginSlice",
    initialState: loadMemberCookie() || initState, // 쿠키가 없다면 초깃값 사용
    reducers: {
        login: (state, action) => {
            console.log("login.....");

            // {소셜로그인 회원이 사용}
            const payload = action.payload;

            setCookie("member", JSON.stringify(payload), 1); // 1일
            return payload;
        },
        logout: (state, action) => {
            console.log("logout.....");

            removeCookie("member");

            return { ...initState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                console.log("fulfilled");

                const payload = action.payload;

                // 정상적인 로그인시에만 저장한다.
                if (!payload.error) {
                    setCookie("member", JSON.stringify(payload), 1); // 1일
                }

                return payload;
            })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected");
            });
    },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
