export type SortOption = "rating" | "price" | "name";

export interface ProductFilterValues {
  search: string;
  vendor: string;
  sort: SortOption;
}
