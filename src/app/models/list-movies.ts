import { Movie } from "./movie";
import { Pageable } from "./pageable";
import { Sort } from "./sort";

export class Movies {
    content: Movie[];
    pageable: Pageable;
    totalElements: number;
    last: boolean;
    totalPages: number;
    first: boolean;
    sort: Sort;
    number: number;
    numberOfElements: number;
    size: number;
}