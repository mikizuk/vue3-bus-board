import axios, {AxiosResponse } from 'axios';

export type SortOrder = 'asc' | 'desc';

export interface BusStop {
  line: number;
  stop: string;
  order: number;
  time: string;
}

const BASE_URL = `http://localhost:3000/stops`;

export async function fetchData(): Promise<BusStop[]> {
  try {
    const response: AxiosResponse<BusStop[]> = await axios.get(BASE_URL);
    return response.data as BusStop[];
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    throw (error as Error).message
  }
}
