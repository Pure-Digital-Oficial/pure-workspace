interface CategoryValue {
  category: string;
  value: number;
}

export interface ListTransactionsForGraphsResponseDto {
  id: string;
  name: string;
  data: CategoryValue[];
}
