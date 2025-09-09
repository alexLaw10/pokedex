import { API_CONFIG } from '../constants';
import type { ApiResponse, ApiError } from '../types';

class ApiService {
  private baseURL: string;
  private timeout: number;
  private retryAttempts: number;

  constructor(baseURL: string = API_CONFIG.BASE_URL, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    attempt: number = 1
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      console.log(`Making request to: ${url}`);
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP ${response.status} error for ${url}:`, errorText);
        
        if (response.status === 404) {
          throw new Error(`Resource not found: ${url}`);
        } else if (response.status >= 500) {
          throw new Error(`Server error (${response.status}): ${response.statusText}`);
        } else if (response.status >= 400) {
          throw new Error(`Client error (${response.status}): ${response.statusText}`);
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (attempt < this.retryAttempts && this.shouldRetry(error)) {
        console.warn(`Request failed, retrying... (${attempt}/${this.retryAttempts})`);
        await this.delay(1000 * attempt); 
        return this.request<T>(endpoint, options, attempt + 1);
      }

      throw this.handleError(error);
    }
  }

  private shouldRetry(error: unknown): boolean {
    if (error instanceof Error) {
      
      return error.name === 'AbortError' || 
             error.message.includes('fetch') ||
             error.message.includes('timeout');
    }
    return false;
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'API_ERROR',
        status: 0,
      };
    }

    return {
      message: 'Erro desconhecido',
      code: 'UNKNOWN_ERROR',
      status: 0,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<ApiResponse<T>> {
    let finalEndpoint = endpoint;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      finalEndpoint = `${endpoint}?${searchParams.toString()}`;
    }

    return this.request<T>(finalEndpoint);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export default apiService;
