/**
 * We use this prefix to control cache only for the "learn" page of this repo.
 */
const prefix = "learn:";

/**
 * Generates a cache key by concatenating a prefix with the provided parts, separated by colons.
 *
 * @param {...string} parts - The parts to include in the cache key.
 * @returns {string} The generated cache key.
 */
function getCacheKey(...parts) {
  console.group(`Building cache key`);
  const key = `${prefix}${parts.join(":")}`;
  console.debug(`Build ${key}`);
  console.groupEnd();
  return key;
}

/**
 * Clears cached scenario data from localStorage.
 *
 * If both `scenario_id` and `filename` are provided, clears the cache entry for that specific scenario file.
 * Otherwise, clears all cache entries.
 *
 * @param {string} [scenario_id] - The ID of the scenario to clear from cache.
 * @param {string} [filename] - The filename of the scenario to clear from cache.
 * @returns {undefined} This function does not return a value.
 */
function clearCache(scenario_id, filename) {
  console.group("Clearing cache");
  // Optionally support clearing a single scenario file
  if (scenario_id && filename) {
    const key = getCacheKey(scenario_id, filename);
    localStorage.clear(key);
    console.debug(`Cleared ${key}`);
    console.groupEnd();
    return;
  }

  // Clear entries whose key starts with our prefix
  const keys = Object.keys(localStorage);
  for (const key of keys) {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
      console.debug(`Cleared ${key}`);
    }
  }
  console.groupEnd();
}

/**
 * Retrieves a cached item from localStorage for a given scenario and filename.
 *
 * @param {string} scenario_id - The unique identifier for the scenario.
 * @param {string} filename - The name of the file associated with the cache entry.
 * @returns {string|null} The cached value if found, otherwise null.
 */
function getCached(scenario_id, filename) {
  console.group(`Getting cache`);
  const key = getCacheKey(scenario_id, filename);
  const results = localStorage.getItem(key);
  console.debug(`Retrieved ${results}`);
  console.groupEnd();
  return results;
}

/**
 * Caches the provided content in localStorage using a key composed of the scenario ID and filename.
 *
 * @param {string} scenario_id - The unique identifier for the scenario.
 * @param {string} filename - The name of the file to associate with the cached content.
 * @param {string} content - The content to cache.
 * @returns {undefined} This function does not return a value.
 */
function setCached(scenario_id, filename, content) {
  console.group(`Setting cache`);
  const key = getCacheKey(scenario_id, filename);
  localStorage.setItem(key, content);
  console.groupEnd();
}

export default { setCached, getCached, clearCache };
