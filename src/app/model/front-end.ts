export interface STPColumnTable {
    id: string;
    name: string;
    width?: string;
    ellipsis?: boolean;
    tooltip?: boolean;
    align?: string;
    isSort?: boolean;
  }
  
  export class STPColumnTableClass implements STPColumnTable {
    id: string;
    name: string;
    width?: string;
    ellipsis?: boolean;
    tooltip?: boolean;
    align?: string;
    isSort?: boolean;
  
    constructor(
      id: string,
      name: string,
      width?: string,
      ellipsis?: boolean,
      tooltip?: boolean,
      align?: string,
      isSort?: boolean
    ) {
      this.id = id;
      this.name = name;
      this.width = width;
      this.ellipsis = ellipsis;
      this.tooltip = tooltip;
      this.align = align;
      this.isSort = isSort;
    }
  }
  
  export interface TPRowTable {
    value: string;
    tooltip?: string;
  }
  
  export interface Response {
    status_code: number;
    data: any;
    msg: string;
  }
  