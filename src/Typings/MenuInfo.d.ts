/*
 * @Description: 后端返回的菜单信息
 * @Author: 王占领
 * @Date: 2022-12-23 14:48:44
 * @LastEditTime: 2022-12-23 14:50:20
 * @LastEditors: 王占领
 */
export declare type MenuInfo = {
   appCode: string;
   children: MenuInfo[];
   code: string;
   hiddenFlag: "Y" | "N";
   icon: string;
   id: string;
   levels: number;
   linkedList: [];
   menuTips: string;
   name: string;
   nodeId: string;
   nodeParentId: string;
   num: number;
   parentId: string;
   url: string;
};
