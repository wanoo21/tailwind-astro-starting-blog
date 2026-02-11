import { onCleanup, onMount } from "solid-js";
import { SITE_METADATA } from "@/consts";

const GISCUS_SCRIPT_SRC = "https://giscus.app/client.js";

export default function Giscus() {
  let containerRef!: HTMLDivElement;

  onMount(() => {
    const config = SITE_METADATA.comments?.giscusConfig;
    if (!config) return;

    const resolveTheme = (): string => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? (config.darkTheme ?? "dark") : (config.theme ?? "light");
    };

    const updateGiscusTheme = () => {
      const giscusTheme = resolveTheme();
      const iframe = document.querySelector(
        "iframe.giscus-frame"
      ) as HTMLIFrameElement | null;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: giscusTheme } } },
          "https://giscus.app"
        );
      }
    };

    // Remove any existing Giscus script/iframe in this container to avoid duplicates
    containerRef.innerHTML = "";

    const script = document.createElement("script");
    // Cache-bust so the script runs on each navigation (SPA: same doc, script otherwise doesn't re-execute)
    script.src = `${GISCUS_SCRIPT_SRC}?v=${Date.now()}`;
    script.setAttribute("data-repo", config.repo);
    script.setAttribute("data-repo-id", config.repositoryId);
    script.setAttribute("data-category", config.category);
    script.setAttribute("data-category-id", config.categoryId);
    script.setAttribute("data-mapping", config.mapping);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", config.reactionsEnabled);
    script.setAttribute("data-emit-metadata", config.emitMetadata);
    script.setAttribute("data-input-position", config.inputPosition);
    script.setAttribute("data-theme", resolveTheme());
    script.setAttribute("data-lang", config.lang);
    script.setAttribute("data-loading", config.loading);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    containerRef.appendChild(script);

    // Theme sync: observe document class changes (e.g. dark mode toggle)
    const observer = new MutationObserver(() => {
      if (!containerRef.isConnected) return;
      updateGiscusTheme();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Update theme when Giscus iframe loads (retry a few times)
    const retryThemeUpdate = (attempt = 0) => {
      if (attempt > 10) return;
      if (!containerRef.isConnected) return;
      const iframe = document.querySelector("iframe.giscus-frame");
      if (iframe) {
        updateGiscusTheme();
      } else {
        setTimeout(() => retryThemeUpdate(attempt + 1), 500);
      }
    };
    setTimeout(retryThemeUpdate, 500);

    onCleanup(() => {
      observer.disconnect();
      containerRef.innerHTML = "";
    });
  });

  return <div ref={(el) => (containerRef = el)} />;
}
