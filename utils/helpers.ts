export const capitalize = (text: string) => {
    if (!text) return "";
    return text
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const formatDate = (timestamp: any) => {
    if (!timestamp) return "---";

    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);

    if (isNaN(date.getTime())) return "---";

    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
};