import { Book } from './types';
import axios from 'axios';

type getBookByIdArgs = {
  controller: AbortController
  id: string
}

export async function getBookById({ controller, id }: getBookByIdArgs): Promise<Book> {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
  };
  const response = await axios.get(`https://www.dbooks.org/api/book/${id}`, config);
  return response.data;
}