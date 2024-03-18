import { createSelector } from "@reduxjs/toolkit"

export const userAuth = (state: any) => state.auth

export const userAuthSelector = createSelector(userAuth, (user) => {
    return user
})
