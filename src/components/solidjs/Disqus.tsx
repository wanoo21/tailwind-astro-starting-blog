import { onMount, createEffect } from "solid-js";

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
  let disqusDiv!: HTMLDivElement;

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
  };

  onMount(() => {
    if (props.config.shortname) {
      loadDisqus();
    }
  });

  // Reload Disqus when slug changes
  createEffect(() => {
    const slug = props.slug;
    if (slug && (window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = slug;
          this.page.url = window.location.href;
        },
      });
    }
  });

  return (
    <div>
      <div id="disqus_thread" ref={disqusDiv}></div>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
}
