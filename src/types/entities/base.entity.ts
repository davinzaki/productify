export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// Entity = "This is ALL the data that exists for this thing"
// DTO = "This is ONLY the data I need for this specific operation/context"

// Entity = How data is structured internally
// DTO = How data is transferred via APIs
// Schema = How data is validated
