import { extractData } from "@/lib/utils";
import { baseQuery } from "@/shared/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Message, MessageCreateRequest } from "./type/message";
import {
  setConversations,
  setMessagesForConversation,
  setSelectedConversationId,
} from "./slice";
import { Conversation, ConversationSummary } from "./type/conversation";
import { setUnreadMessageCount, setUnseenConversationCount } from "../user/meta/slice";
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
    getConversationById: build.query<Conversation, number>({
      query: (id) => `chat/conversations/${id}`,
      transformResponse: extractData,
      providesTags: ["Chat"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const conversationId = data.summary.id;
          const messages = data.messages;
          dispatch(setSelectedConversationId(conversationId));
          dispatch(setMessagesForConversation({ conversationId, messages }));
          dispatch(chatApi.endpoints.markAsSeen.initiate(conversationId));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getUnseenConversationCount: build.query<number, void>({
      query: () => "chat/conversations/unseen",
      transformResponse: extractData,
      providesTags: ["Chat"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUnseenConversationCount(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getConversations: build.query<ConversationSummary[], void>({
      query: () => "chat/conversations",
      transformResponse: extractData,
      providesTags: ["Chat"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setConversations(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    markAsSeen: build.mutation<void, number>({
      query: (id) => ({
        url: `chat/conversations/${id}/seen`,
        method: "POST",
      }),
      invalidatesTags: ["Message"],
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
    getOrCreateConversation: build.mutation<
      ConversationSummary,
      { targetId: number }
    >({
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
  useGetOrCreateConversationMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetConversationByIdQuery,
  useMarkAsSeenMutation,
  useGetUnseenConversationCountQuery
} = chatApi;
