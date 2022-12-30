/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-06-15 15:24:29
 * @LastEditTime: 2022-12-26 15:11:10
 * @LastEditors: 王占领
 */
import { validPhoneNumber, validEmail } from "./Validate";

type Validator = (
   rule: string,
   value: string,
   callback: (e: Error) => void
) => boolean;

const createRule =
   (
      validator: Record<string, string | boolean> | Validator,
      defaultMsg?: string
   ) =>
   (msg: string, rule = {}) => {
      if (typeof validator === "function") {
         return {
            validator: (
               rule: string,
               value: string,
               callback: (e?: Error) => void
            ) => {
               if (!validator(rule, value, callback)) {
                  return callback(new Error(msg || defaultMsg));
               }

               return callback();
            },
            trigger: ["change", "blur"]
         };
      } else {
         return {
            message: msg || defaultMsg,
            trigger: ["change", "blur"],
            ...validator,
            ...rule
         };
      }
   };

export default {
   required: createRule({ required: true }),
   validator: (validator: Validator) => ({
      validator,
      trigger: ["change", "blur"]
   }),
   phoneNumber: createRule(
      (rule, value, callback) => validPhoneNumber(value),
      "手机号不正确"
   ),
   email: createRule((rule, value, callback) => validEmail(value), "邮箱不正确")
};
