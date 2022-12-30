/*
 * @Description  : 表格的列
 * @Author       : 王占领
 * @Date         : 2022-05-05 11:00:31
 * @LastEditTime: 2022-11-24 19:55:09
 * @LastEditors: 王占领
 */
export declare interface Column<T> {
   row: T;
   index: number;
}

export declare interface Response<T> {
   message: T;
}

export declare interface MonitorResponse {
   message: { result: { [key: string]: string[] }[] };
}

export declare type SimpleObj<T = string | number> = Record<string, T>;
export declare type Obj<T = string | number | SimpleObj> = {
   [key: string]: T;
};
export declare type NullableNumber = number | null;
export declare type NullableString = string | null;
