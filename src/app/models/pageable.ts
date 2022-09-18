import { Sort } from "./sort";

export class Pageable {
    sort: Sort;
    pageSize: number;
    pageNumber: number;
    offSet: number;
    paged: boolean;
    unpaged: boolean;
}
