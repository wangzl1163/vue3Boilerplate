/*
 * @Description  : 表格的列
 * @Author       : 王占领
 * @Date         : 2022-05-05 11:00:31
 * @LastEditTime: 2023-02-01 16:34:51
 * @LastEditors: 王占领
 */
export declare interface Column<T> {
   row: T;
   index: number;
}

export declare interface Response<T> {
   message: T;
}

export declare type ListResponse<T> = {
   message: {
      data: T;
      total: number;
      page: number;
      page_size: number;
   };
};

export declare type SimpleObj<T = string | number> = Record<string, T>;

export declare type Obj<T = string | number | SimpleObj> = {
   [key: string]: T;
};

export declare type NullableNumber = number | null | undefined;

export declare type NullableString = string | null | undefined;

export declare type ColumnAttrs<T = Obj> = {
   type?: string;
   label?: string;
   prop?: string;
   width?: string;
   minWidth?: string;
   sortable?: boolean;
   columnAttrs?: {
      fixed?: "right" | "left";
      selectable?: (row: T, index?: number) => boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sortMethod?: (a: any, b: any) => number;
   };
   render?: (col: Column<T>) => void;
   renderHeader?: (col: Column<T>) => void;
};
