import {axiosInstance} from '@/utils';

interface CreateCommentDto {
  content: string;
  feedId: number;
  parentCommentId?: number;
}

export const createComment = async (
  body: CreateCommentDto,
): Promise<number> => {
  const {data} = await axiosInstance.post('/comments', body);

  return data;
};

export const deleteComment = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.delete(`/comments/${id}`);

  return data;
};
