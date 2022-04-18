const SESSION_STORAGE_KEY = "table";

/**
 * Получить список колонок из хранилища
 * @param tableId
 */
export const getColumnsFromStorage = (tableId: string): string[] => {
  const key = `${SESSION_STORAGE_KEY}_${tableId}_columns`;
  const storedAsJson = sessionStorage.getItem(key);
  if (storedAsJson) {
    return JSON.parse(storedAsJson);
  }

  return [];
};

/**
 * Сохранить список колонок в хранилище
 * @param tableId
 * @param columns
 */
export const setColumnsToStorage = (tableId: string, columns: string[]) => {
  const key = `${SESSION_STORAGE_KEY}_${tableId}_columns`;
  sessionStorage.setItem(key, JSON.stringify(columns));
};

/**
 * Получить текущую сортировку
 * @param tableId
 */
export const getSortFromStorage = (
  tableId: string
): [string, "asc" | "desc"][] => {
  const key = `${SESSION_STORAGE_KEY}_${tableId}_sort`;
  const storedAsJson = sessionStorage.getItem(key);
  if (storedAsJson) {
    return JSON.parse(storedAsJson);
  }

  return [];
};

/**
 * Сохранить сортировку в хранилище
 * @param tableId
 * @param sort
 */
export const setSortToStorage = (
  tableId: string,
  sort: [any, "asc" | "desc"][]
) => {
  const key = `${SESSION_STORAGE_KEY}_${tableId}_sort`;
  sessionStorage.setItem(key, JSON.stringify(sort));
};

/**
 * Получить текущие фильтры
 * @param tableId
 */
export const getFilterFromStorage = (
  tableId: string
): {[x: string]: {value: any; options: any}} => {
  const key = `${SESSION_STORAGE_KEY}_${tableId}_filter`;
  const storedAsJson = sessionStorage.getItem(key);
  if (storedAsJson) {
    return JSON.parse(storedAsJson);
  }

  return {};
};

/**
 * Сохранить фильтры в хранилище
 * @param tableId
 * @param filter
 */
export const setFilterToStorage = (
  tableId: string,
  filter: {[x: string]: {value: any; options: any}}
) => {
  const key = `${SESSION_STORAGE_KEY}_${tableId}_filter`;
  sessionStorage.setItem(key, JSON.stringify(filter));
};
