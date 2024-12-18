// .envを読み込む
// うまくやればprocess.env.{"キー"}でアクセスできそう（？）
import dotenv from 'dotenv';

export function loadDotEnv() {

dotenv.config();

console.log(process.env.TEST_KEY); // HelloWorld

}
