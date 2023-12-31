import { privateApi } from "./index";

export const itemsApiMixin = {
  methods: {
    async createItem(item) {
      return await privateApi.post("/items/new", item);
    },
    async removeItem(itemId) {
      return await privateApi.delete(`/items/${itemId}`);
    },
    async updateItem(itemId, payload) {
      const res = await privateApi.patch(`/items/${itemId}`, payload);
      return res;
    },
  },
};
