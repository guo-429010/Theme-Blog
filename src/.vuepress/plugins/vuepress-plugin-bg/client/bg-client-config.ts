import { defineClientConfig } from "@vuepress/client";
import { onMounted } from "vue";

export default defineClientConfig({
    setup() {
        onMounted(() => {
            const img = document.createElement('img');
            img.src = '/assets/sea-wave.svg'
            img.style.cssText = "position:fixed;left:0;bottom:0;z-index:1;width:100vw;height:40vh;object-fit: cover;pointer-events:none;"
            document.body.appendChild(img)
        })
    }
})