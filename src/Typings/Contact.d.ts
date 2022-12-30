/*
 * @Description: 告警联系人接口类型
 * @Author: 王占领
 * @Date: 2022-06-24 10:24:41
 * @LastEditTime: 2022-06-24 11:06:47
 * @LastEditors: 王占领
 */

export declare interface Contact {
   ID: number;
   user_name: string;
   alias_name: string;
   job_number: string;
   department: string;
   email: string;
   phone_number: string;
   ding_ding_number: string;
   we_chat_number: string;
   password: string;
   user_type: string;
   alert_groups: ContactGroup[];
   group_ids: number[];
   create_at: string;
   update_at: string;
}

export declare interface ContactGroup {
   ID: number;
   group_name: string;
   description: string;
   manager_user_name: string;
   department: string;
   dingding_webhook: string;
   dingding_at_mobiles: string;
   users: Contact[];
   user_ids: number[];
   create_at: string;
   update_at: string;
}
