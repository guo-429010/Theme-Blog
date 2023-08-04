import { PluginFunction } from "vuepress";
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

const bgPlugin = (): PluginFunction => {
    return (app) => {
        return {
            name: 'vuepress-plugin-bg',
            clientConfigFile: path.resolve(__dirname, "./client/bg-client-config.ts")
        }
    }
}

export { bgPlugin }