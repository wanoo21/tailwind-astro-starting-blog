export const formatDate = (date: Date | string, locale?: string | string[]) => {
    if (typeof date === "string") {
        date = new Date(date);
    }
    return date.toLocaleDateString(locale || "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};