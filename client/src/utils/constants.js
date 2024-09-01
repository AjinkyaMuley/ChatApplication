import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import animationData from '@/assets/lottie-json'

export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = "api/auth"
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`


export const CONTACTS_ROUTES = 'api/contacts'
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search`
export const GET_DM_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/get-contact-for-dm`;
export const GET_ALL_CONTACTS = `${CONTACTS_ROUTES}/get-all-contacts`


export const MESSAGES_ROUTES = 'api/messages'
export const GET_ALL_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-messages`;

export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/upload-file`

export const CHANNEL_ROUTES = 'api/channel';
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTES}/create-channel`;
export const GET_USER_CHANNEL_ROUTE =`${CHANNEL_ROUTES}/get-user-channels`;
export const GET_CHANNEL_MESSAGES = `${CHANNEL_ROUTES}//get-channel-messages`

export const colors = [
    "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
    "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
    "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
    "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
];


export const getColor = (color) => {
    if(color >= 0 && color < colors.length){
        return colors[color]
    }
    return colors[0];
}


export const animationDefaultOptions = {
    loop:true,
    autoplay :true,
    animationData
}