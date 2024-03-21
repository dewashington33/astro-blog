//  this file contains utility functions that can be used in multiple places in the app

// Format a date to be human-readable
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Capitalize the first letter of a string
function capitalize(str: string) {
  if (typeof str !== "string" || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { formatDate, capitalize };
