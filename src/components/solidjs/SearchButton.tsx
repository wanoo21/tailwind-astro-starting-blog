import { createSignal, createEffect, For, Show, onMount, onCleanup } from "solid-js";
import { useTranslations } from "@/i18n";

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  tags: string[];
}

const t = useTranslations();

export default function SearchButton() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal<SearchResult[]>([]);
  const [allPosts, setAllPosts] = createSignal<SearchResult[]>([]);
  const [isLoading, setIsLoading] = createSignal(false);

  // Load search data when component mounts
  createEffect(() => {
    if (isOpen() && allPosts().length === 0) {
      setIsLoading(true);
      fetch("/search.json")
        .then((res) => res.json())
        .then((data) => {
          setAllPosts(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading search data:", error);
          setIsLoading(false);
        });
    }
  });

  // Perform search when query changes (with debouncing)
  createEffect((prevTimeout?: number) => {
    const searchQuery = query().toLowerCase().trim();
    
    // Clear previous timeout before setting up new one
    if (prevTimeout !== undefined) {
      clearTimeout(prevTimeout);
    }
    
    if (!searchQuery) {
      setResults([]);
      return undefined;
    }

    // Debounce search by 150ms
    const timeout = setTimeout(() => {
      const filtered = allPosts().filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(searchQuery);
        const summaryMatch = post.summary.toLowerCase().includes(searchQuery);
        const contentMatch = post.content.toLowerCase().includes(searchQuery);
        const tagsMatch = post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery)
        );
        return titleMatch || summaryMatch || contentMatch || tagsMatch;
      });

      setResults(filtered);
    }, 150);
    
    // Return timeout to be passed as prevTimeout in next run
    return timeout;
  });

  // Handle keyboard shortcuts
  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K to toggle search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen());
      }
      // ESC to close
      if (e.key === "Escape" && isOpen()) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeSearch();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Use the browser's locale for consistent internationalization
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={openSearch}
        aria-label="Search"
        class="text-gray-900 dark:text-gray-100"
        title="Search (⌘K)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>

      {/* Search Modal */}
      <Show when={isOpen()}>
        <div
          class="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div class="w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div class="border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search posts..."
                  class="flex-1 px-4 py-4 bg-transparent border-0 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                  value={query()}
                  onInput={(e) => setQuery(e.currentTarget.value)}
                  autofocus
                />
                <button
                  onClick={closeSearch}
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span class="text-xs font-medium">ESC</span>
                </button>
              </div>
            </div>

            {/* Results */}
            <div class="max-h-96 overflow-y-auto">
              <Show when={isLoading()}>
                <div class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  Loading...
                </div>
              </Show>

              <Show when={!isLoading() && query() && results().length === 0}>
                <div class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No results found for "{query()}"
                </div>
              </Show>

              <Show when={!isLoading() && results().length > 0}>
                <ul class="py-2">
                  <For each={results()}>
                    {(result) => (
                      <li>
                        <a
                          href={`/blog/${result.slug}`}
                          class="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={closeSearch}
                        >
                          <div class="font-semibold text-gray-900 dark:text-gray-100">
                            {result.title}
                          </div>
                          <div class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {result.summary}
                          </div>
                          <div class="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                            <time>{formatDate(result.date)}</time>
                            <Show when={result.tags.length > 0}>
                              <span>•</span>
                              <div class="flex gap-1" role="list" aria-label="Tags">
                                <For each={result.tags.slice(0, 3)}>
                                  {(tag) => (
                                    <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded" role="listitem">
                                      {tag}
                                    </span>
                                  )}
                                </For>
                              </div>
                            </Show>
                          </div>
                        </a>
                      </li>
                    )}
                  </For>
                </ul>
              </Show>

              <Show when={!isLoading() && !query()}>
                <div class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <div class="text-sm">
                    Start typing to search posts...
                  </div>
                  <div class="text-xs mt-2 text-gray-400">
                    Tip: Press <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">⌘K</kbd> to open search
                  </div>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
