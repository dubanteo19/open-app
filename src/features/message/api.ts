import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Conversation } from "./type/conversation";
import { Message, MessageCreateRequest } from "./type/message";
export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["Chat", "Message"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getMessages: build.query<Message[], number>({
      query: (id) => `chat/conversations/${id}/messages`,
      transformResponse: extractData,
      providesTags: ["Message"],
    }),
    getConversation: build.query<Conversation, number>({
      query: (id) => `chat/conversations/${id}`,
      transformResponse: extractData,
      providesTags: ["Chat"],
    }),
    getConversations: build.query<Conversation[], void>({
      query: () => "chat/conversations",
      transformResponse: extractData,
      providesTags: ["Chat"],
    }),
    sendMessage: build.mutation<Message, MessageCreateRequest>({
      query: (body) => ({
        url: `chat/conversations/${body.conversationId}/messages`,
        body,
        method: "POST",
      }),
      transformResponse: extractData,
      invalidatesTags: ["Message"],
    }),
    createConversation: build.mutation<Conversation, { targetId: number }>({
      query: (params) => ({
        url: "chat/conversations",
        params,
        method: "POST",
      }),
      transformResponse: extractData,
      invalidatesTags: ["Chat"],
    }),
  }),
});
export const {
  useCreateConversationMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetConversationQuery
} = chatApi;
