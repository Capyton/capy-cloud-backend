import { InjectionToken } from "@nestjs/common"

// Config-related
export const API_CONFIG: InjectionToken = "API_CONFIG"
export const AUTH_AND_TOKENS_CONFIG: InjectionToken = "AUTH_AND_TOKENS_CONFIG"
export const FILES_CONFIG: InjectionToken = "FILES_CONFIG"
export const CONFIG: InjectionToken = "CONFIG"

// Database-related
export const DATA_SOURCE: InjectionToken = "DATA_SOURCE"

// Interceptors, middlewares, etc.
export const FILES_FIELD_KEY: InjectionToken = "FILES_FIELD_KEY"
