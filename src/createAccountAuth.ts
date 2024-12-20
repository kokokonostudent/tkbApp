import { JWT } from "google-auth-library";

export function createAccountAuth(): JWT {
    return new JWT();
    /* 必要情報を入力 */
}
