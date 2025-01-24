export interface AnimeRelations {
  data: AnimeRelationsInfo[];
}

export interface AnimeRelationsInfo {
  relation: string;
  entry: Entry[];
}

export interface Entry {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
