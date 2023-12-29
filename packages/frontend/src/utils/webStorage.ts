export function createLocalStorage<Value>(key: string, defaultValue: Value) {
  return createStorage({ type: "localStorage", key, defaultValue });
}

export function createSessionStorage<Value>(key: string, defaultValue: Value) {
  return createStorage<Value>({ type: "sessionStorage", key, defaultValue });
}

type CreateStorageOptions<Value> = {
  type: "localStorage" | "sessionStorage";
  key: string;
  defaultValue: Value;
};

function createStorage<Value>({
  type,
  key,
  defaultValue,
}: CreateStorageOptions<Value>) {
  const getItem = (): Value => {
    const value = window?.[type].getItem(key);

    if (value === null) return defaultValue;

    try {
      const parsedValue = JSON.parse(value);
      return parsedValue as Value;
    } catch (error) {
      return defaultValue;
    }
  };

  const setItem = (value: Value) =>
    window?.[type].setItem(key, JSON.stringify(value));

  const removeItem = () => window?.[type].removeItem(key);

  return {
    getItem,
    setItem,
    removeItem,
  };
}
