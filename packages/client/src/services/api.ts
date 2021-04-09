import { WebApp, ApiResponse, PaginatedApiResponse } from "@/types";
import axiosStatic from "axios";

const axios = axiosStatic.create({
  baseURL: window.location.origin.match(/https?:\/\/[a-z0-9\-.]*/) + ":3000" + "/api",
  validateStatus: null
});

export async function getApp(id: string): Promise<WebApp> {
  const request = axios.get<ApiResponse<WebApp>>("/webapp/" + id);
  const response = await request;
  if (response.data.status === "error") {
    throw response.data.message;
  }
  return response.data.data;
}

export async function submitApp(url: string): Promise<WebApp> {
  const request = axios.post<ApiResponse<WebApp>>("/webapp", {
    data: { appUrl: url, appleMobileWebAppCapable: true } // TODO make appleMobileWebAppCapable dynamic
  });
  const response = await request;
  if (response.data.status === "error") {
    throw response.data.message;
  }
  return response.data.data;
}

export class WebAppQuery {
  private nextPage?: number = 0;
  private webApps: WebApp[] = [];

  constructor() {
    this.getMore();
  }

  hasNextPage(): boolean {
    return this.nextPage !== undefined;
  }

  getApps() {
    return this.webApps;
  }

  async getMore(): Promise<WebApp[]> {
    if (this.hasNextPage()) {
      const request = axios.get<PaginatedApiResponse<WebApp>>("/webapp", { params: { page: this.nextPage } });
      const response = await request;
      if (response.data.status === "error") {
        throw response.data.message;
      }
      this.nextPage = response.data.nextPage ?? undefined;
      this.webApps.push(...response.data.data);
      return this.webApps;
    } else {
      throw "no more pages";
    }
  }
}
