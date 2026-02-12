interface CategoryValue {
  category: string;
  value: string;
}

export interface ListTransactionsForGraphsResponseDto {
  id: string;
  name: string;
  data: CategoryValue[];
}
