export interface AnimeReviews {
    pagination: Pagination;
    data:       AnimeReviewsData[];
}

export interface AnimeReviewsData {
    mal_id:           number;
    url:              string;
    type:             Type;
    reactions:        Reactions;
    date:             Date;
    review:           string;
    score:            number;
    tags:             Tag[];
    is_spoiler:       boolean;
    is_preliminary:   boolean;
    episodes_watched: null;
    user:             User;
}

export interface Reactions {
    overall:      number;
    nice:         number;
    love_it:      number;
    funny:        number;
    confusing:    number;
    informative:  number;
    well_written: number;
    creative:     number;
}

export enum Tag {
    Recommended = "Recommended",
    WellWritten = "Well-written",
}

export enum Type {
    Anime = "anime",
}

export interface User {
    url:      string;
    username: string;
    images:   { [key: string]: Image };
}

export interface Image {
    image_url: string;
}

export interface Pagination {
    last_visible_page: number;
    has_next_page:     boolean;
}
