import axios from 'axios';

export interface BusStop {
  line: number;
  stop: string;
  order: number;
  time: string;
}

export interface BusResponse {
  data: BusStop[] | null;
  error: string | null;
}

async function fetchData(param: string): Promise<BusResponse> {
  let BASE_URL = `http://localhost:3000/stops`;
  
  if (param === "line-asc") {
    BASE_URL = `http://localhost:3000/stops?_sort=line&_line=asc`;
  }
  // const BASE_URL = `http://localhost:3000/stops?line=102`;

  // const params = new URLSearchParams({
  //   sort: 'line',
  //   line: 'asc'
  // })

  console.info("fetchData....");
  try {
    const response = await axios.get(BASE_URL);
    // const response = await axios.get(BASE_URL, { params });

    console.info('response:', response);

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch data. Status: ${response.status} ${response.statusText}`
      );
    }

    return {
      data: response.data,
      error: null
    }
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    return {
      data: null,
      error: (error as Error).message,
    };
  }
}

export async function getBusLines(param: string): Promise<number[] | string | null> {
  const { data, error } = await fetchData(param)
  if (data) {
    return [...new Set(data.map((item: BusStop) => item.line))]
  }
  else {
    return error
  }
}