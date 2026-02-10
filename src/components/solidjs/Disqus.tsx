import { onMount, onCleanup, createEffect, on } from "solid-js";

interface DisqusProps {
  slug: string;
  config: {
    shortname: string;
    url?: string;
    identifier?: string;
    title?: string;
  };
}

export default function Disqus(props: DisqusProps) {
  let scriptElement: HTMLScriptElement | null = null;

  const loadDisqus = () => {
    const { shortname, url, identifier, title } = props.config;
    
    // Set Disqus configuration
    (window as any).disqus_config = function () {
      this.page.url = url || window.location.href;
      this.page.identifier = identifier || props.slug;
      if (title) {
        this.page.title = title;
      }
    };

    // Load Disqus script
    const script = document.createElement("script");
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute("data-timestamp", String(+new Date()));
    (document.head || document.body).appendChild(script);
    scriptElement = script;
  };

  onMount(() => {
    if (props.config.shortname) {
      loadDisqus();
    }
  });

  onCleanup(() => {
    if (scriptElement && scriptElement.parentNode) {
      scriptElement.parentNode.removeChild(scriptElement);
    }
  });

  // Reload Disqus when slug changes (using on() to skip initial run)
  createEffect(on(
    () => props.slug,
    (slug, prevSlug) => {
      // Only reset if slug actually changed and DISQUS is loaded
      if (slug && prevSlug !== undefined && slug !== prevSlug && (window as any).DISQUS) {
        (window as any).DISQUS.reset({
          reload: true,
          config: function () {
            this.page.identifier = slug;
            this.page.url = window.location.href;
          },
        });
      }
    }
  ));

  return (
    <div>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
}
